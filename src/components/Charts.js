import React, { Component, cloneElement } from 'react';
import echarts from 'echarts/echarts';

export default class Charts extends Component {
  static propTypes = {
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    animation: React.PropTypes.bool,
    calculable: React.PropTypes.bool,
    renderAsImage: React.PropTypes.bool,
    timeline: React.PropTypes.object,
    title: React.PropTypes.object,
    toolbox: React.PropTypes.object,
    tooltip: React.PropTypes.object,
    legend: React.PropTypes.object,
    dataRange: React.PropTypes.object,
    dataZoom: React.PropTypes.object,
    roamController: React.PropTypes.object,
    grid: React.PropTypes.object,
    color: React.PropTypes.array,
    children: React.PropTypes.node.isRequired,
    xAxis: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
    yAxis: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array,
    ]),
  };

  static defaultProps = {
    height: 400,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  getChartData(options) {
    options.series = [];
    React.Children.map(this.props.children, (child) => {
      const series = {};
      [
        'zlevel',
        'z',
        'name',
        'size',
        'textRotation',
        'autoSize',
        'textPadding',
        'tooltip',
        'clickable',
        'itemStyle',
        'data',
        'markPoint',
        'markLine',
        'stack',
        'smooth',
        'mapType',
        'selectedMode',
      ].map((key) => {
        const option = child.props[key];
        if (option) {
          series[key] = option;
        }
      });
      series.type = child.type.name !== 'chart' ? child.type.name : child.props.type;
      options.series.push(series);
    });
  }

  drawChart() {
    const node = this.refs.chart;
    const options = {};
    [
      'backgroundColor',
      'animation',
      'calculable',
      'renderAsImage',
      'timeline',
      'title',
      'toolbox',
      'tooltip',
      'legend',
      'dataRange',
      'dataZoom',
      'roamController',
      'grid',
      'color',
      'xAxis',
      'yAxis',
    ].map((key) => {
      const option = this.props[key];
      if (option) {
        options[key] = option;
      }
    });
    this.getChartData(options);
    this.chart = echarts.init(node);
    // 不阻断页面渲染，在页面渲染完成后再进行图表的渲染
    setTimeout(()=>{
      this.chart.setOption(options);
    }, 200);
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return cloneElement(child, {
        hasChart: true
      });
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <div
        ref="chart"
        style={{
          height,
          width
        }}>
        {this.renderChildren()}
      </div>
    );
  }
}
