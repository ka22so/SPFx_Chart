import * as React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, ReferenceLine } from 'recharts';
import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';

import styles from './Chart.module.scss';

export default class CustomizedTooltip extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    const { payload, label } = this.props;
    let list = [];
    if (payload[0] && payload[0].payload && payload[0].payload.content) {
      payload[0].payload.content.forEach((item) :any => {
        list.push(<div className={styles["spfx-chart-tooltip-inner"]}>
            <div className={styles["spfx-chart-tooltip-title"]}>{item.title}</div>
            <div className={styles["spfx-chart-tooltip-sales"]}>¥{item.sales.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')}</div>
            <div className={styles["spfx-chart-tooltip-tasks"]}>{item.tasks} 人月</div>
          </div>);
      });
    }

    return (
      <div className={styles["spfx-chart-tooltip"]}>
        {list}
      </div>
    );
  }
}

