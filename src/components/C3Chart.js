import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import 'c3/c3.css';
import c3 from 'c3';

class C3Chart extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.generate(this.props);

    // The sizing calculations are done before everything has loaded
    // Do a quick resize shortly after to make sure it fits the box
    setTimeout(() => this.chart.resize(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.generate(nextProps);
  }

  componentWillUmount() {
    this.destroy();
  }

  generate(props) {
    // Gather provided props to use as options
    let { style, className, ...options } = props;

    // Destroy it if we have it
    this.destroy();

    this.chart = c3.generate({ bindto: findDOMNode(this), ...options });
  }

  destroy() {
    if (!this.chart)
      return;

    this.chart = this.chart.destroy();
  }

  render() {
    let { className, style } = this.props;

    return (
      <div className={className} style={style} />
    );
  }
}

C3Chart.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.object,
  padding: PropTypes.object,
  color: PropTypes.object,
  interaction: PropTypes.object,
  transition: PropTypes.object,
  oninit: PropTypes.func,
  onrendered: PropTypes.func,
  onmouseover: PropTypes.func,
  onmouseout: PropTypes.func,
  onresize: PropTypes.func,
  onresized: PropTypes.func,
  axis: PropTypes.object,
  grid: PropTypes.object,
  regions: PropTypes.array,
  legend: PropTypes.object,
  tooltip: PropTypes.object,
  subchart: PropTypes.object,
  zoom: PropTypes.object,
  point: PropTypes.object,
  line: PropTypes.object,
  area: PropTypes.object,
  bar: PropTypes.object,
  pie: PropTypes.object,
  donut: PropTypes.object,
  gauge: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object
};

export default C3Chart;