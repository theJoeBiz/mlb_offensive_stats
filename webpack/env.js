var env = process.env.NODE_ENV;
var DEV = env === 'development';
var TEST = env === 'test';

module.exports = {
  DEV: DEV,
  TEST: TEST,
  PROD: !(DEV || TEST)
};