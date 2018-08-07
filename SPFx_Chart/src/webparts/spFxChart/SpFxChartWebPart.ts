import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxChartWebPartStrings';

import Container from './containers/SPFxContainer';
import { ISPFxProps } from './state/SPFxState';
import configureStore from './store/SPFxStore';
import { Provider } from 'react-redux';

const store = configureStore();

export default class SpFxChartWebPart extends BaseClientSideWebPart<ISPFxProps> {

  public render(): void {
    const element: React.ReactElement<ISPFxProps > = React.createElement(
      typeof Provider, null, React.createElement(
        Container,
        {
          store: store,
          description: this.properties.description,
          spHttpClient: this.context.spHttpClient,
          currentWebUrl: this.context.pageContext.web.serverRelativeUrl,
          displayName: this.context.pageContext.user.displayName,
          loginName: this.context.pageContext.user.loginName
        }
      )
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
