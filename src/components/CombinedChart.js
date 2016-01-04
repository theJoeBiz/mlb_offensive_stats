import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import classnames from 'classnames';

import C3Chart from './C3Chart';

class CombinedChart extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { data, stats, ...options } = this.props;

    let defaultOptions = {
      data: {
        json: data,
        keys: {
          x: 'gameNumber',
          value: stats
        },
        names: {
          AVG: 'Batting Average',
          OPS: 'On-base Plus Slugging',
          SLG: 'Slugging Percentage',
          OBP: 'On-base Percentage',
          BBP: 'Walk Percentage',
          BBPSO: 'Walks per Strike Out',
          ISO: 'Isolated Power',
          BABIP: 'Batting Average on Balls in Play'
        }
      },
      tooltip: {
        format: {
          title: x => `Game #${x} - ${data[x - 1].date.format('MMM D YYYY')}`,
          value: (value, ratio, id, index) => {
            let lastValue = (data[index - 1] || {})[id] || 0;

            let changed = value - lastValue;
            let symbol = changed < 0 ? '-' : '+';

            let changedClass = classnames(
              { 'red-text': changed < 0 },
              { 'green-text text-darken-2': changed >= 0 }
            );

            return renderToStaticMarkup(
              <div>
                <span>{value.toFixed(3)}</span>
                &nbsp;
                <small className={changedClass}>
                  <span style={{ minWidth: '4em', display: 'inline-block' }}>
                    {symbol} {Math.abs(changed).toFixed(3)}
                  </span>
                </small>
              </div>
            );
          }
        }
      }
    };

    return (
      <C3Chart ref="chart" {...defaultOptions} {...options} />
    );
  }
}

export default CombinedChart;