import 'babel-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './less/app.less';

import Col from './components/Col';
import ChartCard from './components/ChartCard';

import CombinedChart from './components/CombinedChart';
import IndividualChart from './components/IndividualChart';

import { games, leagueWideAverages } from './data';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue darken-3">
              <span className="brand-logo left">Cleveland Indians</span>
              <ul className="right">
                <li><a href="javascript:;">User Name</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="app-canvas">
          <h4 className="header">Jason Kipnis</h4>
          <ChartCard>
            <CombinedChart
              stats={['AVG', 'OPS', 'SLG', 'OBP', 'BBP', 'BBPSO', 'ISO', 'BABIP']}
              data={games}
            />
          </ChartCard>
          <br/>
          <h5 className="header">Individual Statistics</h5>
          <div className="row">
            <Col lg={2}>
              <ChartCard title="Batting Average" calculation="H / AB">
                <IndividualChart
                  stat="AVG"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="On-base Plus Slugging" calculation="OBP + SLG">
                <IndividualChart
                  stat="OPS"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Slugging Average" calculation="TB / AB">
                <IndividualChart
                  stat="SLG"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="On-Base Percentage" calculation="H + BB + HBP / PA">
                <IndividualChart
                  stat="OBP"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Walk Percentage" calculation="BB / PA">
                <IndividualChart
                  stat="BBP"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Walks per Strike Out" calculation="BB / SO">
                <IndividualChart
                  stat="BBPSO"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Isolated Power" calculation="SLG - AVG">
                <IndividualChart
                  stat="ISO"
                  data={games}
                  averages={leagueWideAverages}
                />
              </ChartCard>
            </Col>
            <Col lg={2}>
              <ChartCard title="Batting Average on Balls in Play" calculation="H - HR / AB - K - HR + SF">
                <IndividualChart
                  stat="BABIP"
                  data={games}
                  averages={leagueWideAverages}
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