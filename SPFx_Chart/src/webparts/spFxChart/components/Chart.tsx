import * as React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, ReferenceLine } from 'recharts';
import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';

import CustomizedTooltip from './CustomizedTooltip';

export default class Chart extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    const data = (Environment.type === EnvironmentType.SharePoint) ? this.props.listItems : [
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"},
      {name: 'Test User', tasks: 2, sales: 825000, year: "22", month: "8"}
    ];
    const height = 120 + (data.length * 80);
    const domainSales = [0, 1800000];
    const domainTasks = [0, 1.5];
    const ticksSales = [0, 300000, 600000, 900000, 1200000, 1500000, 1800000];
    const ticksTasks = [0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5];
    const barSize = 24;
    const colorSales = '#71afe5';
    const colorTasks = '#b4a0ff';

    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{top: 5, right: 5, left: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <YAxis dataKey="name" type="category" width={100} />
          <XAxis xAxisId="tasks" type="number" orientation="top" stroke={colorTasks} domain={domainTasks} ticks={ticksTasks} allowDataOverflow="false" />
          <XAxis xAxisId="sales" type="number" orientation="top" stroke={colorSales} domain={domainSales} ticks={ticksSales} allowDataOverflow="false" />
          <Tooltip content={<CustomizedTooltip />} />
          <Bar xAxisId="sales" dataKey="sales"  stackId="a" fill={colorSales} barSize={barSize}>
            <LabelList dataKey="sales" position="insideLeft" formatter={(value) => {
              return `¥${value.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,')}`;
            }} />
          </Bar>
          <Bar xAxisId="tasks" dataKey="tasks" fill={colorTasks} barSize={barSize}>
            <LabelList dataKey="tasks" position="insideLeft" />
          </Bar>
          <Legend verticalAlign="top" align="left" wrapperStyle={{marginLeft: "50px"}} payload={[
            { value: '割当売上（円）', type: 'square', id: 'sales', color: colorSales },
            { value: 'タスクボリューム（人月）', type: 'square', id: 'tasks', color: colorTasks }
          ]} />
          <ReferenceLine xAxisId="tasks" x={1} stroke="red" strokeDasharray="3 3" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

