import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class ChartCard extends Component {
  componentDidMount() {
    let { calculation } = this.props;
    let node = findDOMNode(this.refs.tooltip);

    $().ready(() => {
      $(node).tooltip({
        delay: 50
      });
    });
  }

  componentWillUnmount() {
    let node = findDOMNode(this.refs.tooltip);

    $(node).tooltip('remove');
  }

  render() {
    let { calculation, title, children } = this.props;

    return (
      <div className="card white darken-1">
        <div className="card-content">
          {children}
          {(title || calculation) &&
            <div className="card-title">
              <div className="flex-grow">{title}</div>
              {calculation &&
                <span
                  ref="tooltip"
                  className="btn-floating btn-flat white"
                  data-position="top"
                  data-tooltip={calculation}
                >
                  <i className="material-icons grey-text text-darken-2">more_vert</i>
                </span>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default ChartCard;