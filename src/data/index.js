import moment from 'moment';

import json_kipnis from './json_kipnis';

export let games = json_kipnis.map(game => ({
  gameNumber: parseInt(game.Rk),
  isHomeTeam: game.FIELD6 !== '@',
  date: moment(game.Date, 'MMM D').year(2015),
  PA: parseInt(game.PA),
  AB: parseInt(game.AB),
  Runs: parseInt(game.R),
  Hits: parseInt(game.H),
  Singles: parseInt(game['1B']),
  Doubles: parseInt(game['2B']),
  Triples: parseInt(game['3B']),
  HomeRuns: parseInt(game.HR),
  RBIs: parseInt(game.RBI),
  BB: parseInt(game.BB),
  IBB: parseInt(game.IBB),
  SO: parseInt(game.SO),
  HBP: parseInt(game.HBP),
  SH: parseInt(game.SH),
  SF: parseInt(game.SF),
  ROE: parseInt(game.ROE),
  GDP: parseInt(game.GDP),
  SB: parseInt(game.SB),
  CS: parseInt(game.CS),
  AVG: parseFloat(game.BA),
  OBP: parseFloat(game.OBP),
  SLG: parseFloat(game.SLG),
  OPS: parseFloat(game.OPS),
  BOP: parseInt(game.BOP)
}));

let propsToSum = ['PA', 'AB', 'Runs', 'Hits', 'Doubles',
                  'Triples', 'HomeRuns', 'BB', 'IBB', 'SO',
                  'HBP', 'SH', 'SF'];

let sums = propsToSum.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});

games = games.map(game => {
  propsToSum.forEach(prop => {
    sums[prop] += game[prop] || 0;
  });

  game.BABIP = (sums.Hits - sums.HomeRuns) / (sums.AB - sums.SO - sums.HomeRuns + sums.SF);
  game.BBP = sums.BB / sums.PA;
  game.BBPSO = sums.BB / sums.SO;
  game.ISO = game.SLG - game.AVG;

  return game;
});

function getTotal(prop) {
  return games.reduce((total, game) => total + (game[prop] || 0), 0);
}