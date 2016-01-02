var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = require('./env');

var LOADERS = {
  file: 'file-loader?name=[path][name].[ext]',
  json: ['json-loader'],
  js: ['babel']
};

var lessParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../src'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];

if (!env.PROD) {
  lessParams.push('sourceMap', 'sourceMapContents=true');

  if (env.DEV) {
    LOADERS.js.unshift('react-hot');
  }

  LOADERS.less = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader',
    'less-loader?' + lessParams.join('&')
  ].join('!');

  LOADERS.css = [
    'style-loader',
    'css-loader?sourceMap',
    'postcss-loader'
  ].join('!');
} else {
  LOADERS.less = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    'less-loader?' + lessParams.join('&')
  ].join('!'));

  LOADERS.css = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader'
  ].join('!'));
}

module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: LOADERS.js
  },
  {
    test: /\.css$/,
    loader: LOADERS.css
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
    loader: LOADERS.file
  },
  {
    test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: LOADERS.file
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: LOADERS.json
  },
  {
    test: /\.less$/,
    loader: LOADERS.less
  }
];