import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import classnames from 'classnames';

import C3Chart from './C3Chart';

class IndividualChart extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { data, stat, averages, ...options } = this.props;

    let json = data.map(game => {
      return {
        date: game.date,
        gameNumber: game.gameNumber,
        player: game[stat],
        league: averages[stat]
      };
    });

    let defaultOptions = {
      data: {
        json: json,
        keys: {
          x: 'gameNumber',
          value: ['player', 'league']
        },
        colors: {
          player: '#1f77b4',
          league: '#d62728'
        },
        names: {
          player: 'Jason Kipnis',
          league: 'League Average'
        }
      },
      tooltip: {
        format: {
          title: x => `Game #${x} - ${data[x - 1].date.format('MMM D YYYY')}`,
          value: (value, ratio, id, index) => {
            let game = json[index];
            let otherValue = id === 'player' ? game.league : game.player;

            let difference = value - otherValue;
            let symbol = difference < 0 ? '-' : '+';

            let changedClass = classnames(
              { 'red-text': difference < 0 },
              { 'green-text text-darken-2': difference >= 0 },
              { 'hidden': id === 'league' }
            );

            return renderToStaticMarkup(
              <div>
                <span>{value.toFixed(3)}</span>
                &nbsp;
                <small className={changedClass} style={{ width: 35, display: 'inline-block' }}>
                  {symbol} {Math.abs(difference).toFixed(3)}
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

export default IndividualChart;