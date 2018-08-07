import * as Actions from '../actions/SPFxActions';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataListItem } from '@microsoft/sp-odata-types';

export function getListItems(spHttpClient: SPHttpClient, currentWebUrl: string, libraryName: string, fiscalYear: string, aggregateMonth: string) {
  return async (dispatch: any) => {

    dispatch(Actions.getListItemsRequest(fiscalYear, aggregateMonth));

    try {
      const select: string[] = [
        'Title',
        'FiscalYear',
        'AggregateMonth',
        'Sales',
        'TaskPerMonth',
        'User/FirstName',
        'User/LastName',
        'User/Title',
        'User/ID'
      ];
      const expand: string[] = [
        'User'
      ];
      const orderby: string = 'User/ID';
      const filter: string = `FiscalYear eq '${fiscalYear}' and AggregateMonth eq '${aggregateMonth}'`;

      const query: string = `?$select=${select.join(',')}&$expand=${expand.join(',')}&$orderby=${orderby}&$filter=${filter}`;
      const url: string = `${currentWebUrl}/_api/web/lists/GetByTitle('${libraryName}')/items${query}`;

      const response: SPHttpClientResponse = await spHttpClient.get(url, SPHttpClient.configurations.v1);
      const responseJSON: any = await response.json();
      const listItems: any[] = [];

      responseJSON.value.forEach((item: any, i: number, arr: any[]) => {
        let prevItem = arr[i - 1];
        if (prevItem && (item.User.ID === prevItem.User.ID)) {
          var targetItem = listItems[listItems.length - 1];
          targetItem.sales = (Number(targetItem.sales) + Number(item.Sales)).toString();
          targetItem.tasks = (Number(targetItem.tasks) + Number(item.TaskPerMonth)).toString();
          targetItem.content.push({
            title: item.Title,
            sales: item.Sales,
            tasks: item.TaskPerMonth
          });
        } else {
          listItems.push({
            name: `${item.User.LastName} ${item.User.FirstName}`,
            year: item.FiscalYear,
            month: item.AggregateMonth,
            sales: item.Sales,
            tasks: item.TaskPerMonth,
            content: [{
              title: item.Title,
              sales: item.Sales,
              tasks: item.TaskPerMonth
            }]
          });
        }
      });

      dispatch(Actions.getListItemsSuccess(listItems));

    } catch (error) {
      dispatch(Actions.getListItemsError(error));
    }
  };
}
