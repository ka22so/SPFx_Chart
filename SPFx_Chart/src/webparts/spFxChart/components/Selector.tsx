import * as React from 'react';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import styles from './Chart.module.scss';

export default class Selector extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
    this.updateFiscalYear = this.updateFiscalYear.bind(this);
    this.updateAggregateMonth = this.updateAggregateMonth.bind(this);
  }

  public render(): JSX.Element {

    const _returnArray = (array: string[], label: string, selected?: string): any[] => {
      return array.map((x: any) => {
        return {
          key: x,
          text: `${x} ${label}`,
          select: (selected && (selected === x)) ? true : false
        }
      });
    }
    const fiscalYears: string[] = ['22', '23', '24'];
    const arrayFiscalYear: any[] = _returnArray(fiscalYears, '期', this.props.fiscalYear);
    const aggregateMonths: string[] = ['6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5'];
    const arrayAggregateMonth: any[] = _returnArray(aggregateMonths, '月', this.props.aggregateMonth);

    return (
      <div className={"ms-Grid " + styles["spfx-chart-wrap"]}>
        <div className="ms-Grid-row">
          <div className="docs-DropdownExample ms-Grid-col">
            <Dropdown
              label="集計期:"
              id="Basicdrop1"
              defaultSelectedKey = {this.props.fiscalYear}
              options={arrayFiscalYear}
              onChanged={this.updateFiscalYear}
            />
          </div>
          <div className="docs-DropdownExample ms-Grid-col">
            <Dropdown
              label="集計月:"
              id="Basicdrop2"
              defaultSelectedKey = {this.props.aggregateMonth}
              options={arrayAggregateMonth}
              onChanged={this.updateAggregateMonth}
            />
          </div>
        </div>
      </div>
    );
  }

  private updateFiscalYear(event: {key: string, text: string, select: boolean}){
    this.props.getListItems(this.props.spHttpClient, this.props.currentWebUrl, this.props.title, event.key, this.props.aggregateMonth);
  }
  private updateAggregateMonth(event: {key: string, text: string, select: boolean}){
    this.props.getListItems(this.props.spHttpClient, this.props.currentWebUrl, this.props.title, this.props.fiscalYear, event.key);
  }
}

