import moment from 'moment';

import json_kipnis from './json_kipnis';

export const leagueWideAverages = {
  AVG: .254,
  OPS: .721,
  SLG: .405,
  OBP: .317,
  BBP: .077,
  BBPSO: .380,
  ISO: .150,
  BABIP: .299
};

export const games = getNormalizedGames(json_kipnis);

function getNormalizedGames(games) {
  let propsToSum = ['PA', 'AB', 'Runs', 'Hits', 'Singles', 'Doubles',
                    'Triples', 'HomeRuns', 'BB', 'IBB', 'SO', 'HBP', 'SH', 'SF'];

  // Default sums of zero so we don't have to do a check on every loop to see if it's set
  let sums = propsToSum.reduce((obj, prop) => ({ ...obj, [prop]: 0 }), {});

  return games.map(normalizeGame).map(game => {
    propsToSum.forEach(prop => {
      sums[prop] += game[prop] || 0;
    });
    
    game.BABIP = (sums.Hits - sums.HomeRuns) / (sums.AB - sums.SO - sums.HomeRuns + sums.SF);
    game.BBP = (sums.BB / sums.PA) || 0;
    game.BBPSO = (sums.BB / sums.SO) || 0;

    return game;
  });
}

function normalizeGame(game) {
  let normalized = {
    gameNumber: parseInt(game.Rk),
    isHomeTeam: game.FIELD6 !== '@',
    date: moment(game.Date, 'MMM D').year(2015),
    PA: parseInt(game.PA),
    AB: parseInt(game.AB),
    Runs: parseInt(game.R),
    Hits: parseInt(game.H),
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
  };

  normalized.Singles = normalized.Hits - normalized.Doubles - normalized.Triples - normalized.HomeRuns;
  normalized.ISO = (normalized.SLG - normalized.AVG) || 0;

  return normalized;
}

function getTotal(prop) {
  return games.reduce((total, game) => total + (game[prop] || 0), 0);
}