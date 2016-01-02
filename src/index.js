import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './less/app.less';

import Col from './components/Col';
import Chart from './components/Chart';
import ChartCard from './components/ChartCard';

import { games } from './data';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue darken-3">
              <span className="brand-logo">Cleveland Indians</span>
              <ul className="right">
                <li><a href="javascript:;">Joe Duchnowski</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="app-canvas">
          <h4 className="header">Jason Kipnis</h4>
          <ChartCard>
            <Chart
              values={['AVG', 'OPS', 'SLG', 'OBP', 'BBP', 'BBPSO', 'ISO', 'BABIP']}
              data={games}
            />
          </ChartCard>
          <div className="row">
            <Col lg={2}>
              <ChartCard title="Batting Average" calculation="H / AB">
                <Chart
                  values={['AVG']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="OPS" calculation="OBP + SLG">
                <Chart
                  values={['OPS']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Slugging Average" calculation="TB / AB">
                <Chart
                  values={['SLG']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="On-Base Percentage" calculation="H + BB + HBP / PA">
                <Chart
                  values={['OBP']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="BB Percentage" calculation="BB / PA">
                <Chart
                  values={['BBP']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="BB per Strike Out" calculation="BB / SO">
                <Chart
                  values={['BBPSO']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Isolated Power" calculation="SLG - AVG">
                <Chart
                  values={['ISO']}
                  data={games}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Batting Average on Balls in Play" calculation="H - HR / AB - K - HR + SF">
                <Chart
                  values={['BABIP']}
                  data={games}
                />
              </ChartCard>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));