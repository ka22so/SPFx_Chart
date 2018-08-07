import * as React from 'react';
import styles from './SpfxChart.module.scss';
import { ISPFxType } from '../containers/SPFxContainer';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';

import Selector from './Selector';
import Chart from './Chart';

export default class SpfxChart extends React.Component<ISPFxType, {}> {
  public render(): React.ReactElement<ISPFxType> {
    return (
      <div className={styles.spFxChart}>
        <Selector
          fiscalYear={this.props.fiscalYear}
          aggregateMonth={this.props.aggregateMonth}
          getListItems={this.props.getListItems}
          spHttpClient={this.props.spHttpClient}
          currentWebUrl={this.props.currentWebUrl}
          title={this.props.title}
         />
        {(() => {
          return (Environment.type !== EnvironmentType.SharePoint || this.props.listItems.length > 0) ?
            <Chart listItems={this.props.listItems} /> : <p className={styles["noList"]}>対象のデータがありません</p>;
        })()}
      </div>
    );
  }
  // Event handler
  private componentDidMount() {
    this.props.getListItems(this.props.spHttpClient, this.props.currentWebUrl, this.props.title, this.props.fiscalYear, this.props.aggregateMonth);
  }
}
