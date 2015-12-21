import React, { Component } from 'react';
import Charts from '../../src';

export default class App extends Component {
  render() {
    return (
      <Charts
        legend={{
          data: ['最高气温', '最低气温']
        }}
        xAxis={[
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ]}
        yAxis={[
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ]}>
        <Charts.Line
          name="最高气温"
          data={[11, 11, 15, 13, 12, 13, 10]}/>
        <Charts.Line
          name="最低气温"
          data={[1, -2, 2, 5, 3, 2, 0]}/>
      </Charts>
    );
  }
}
