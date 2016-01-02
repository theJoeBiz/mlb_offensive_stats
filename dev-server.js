var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require(process.argv[2] || './webpack/config');

var pkg = require('./package.json');
var port = pkg.config.devPort;
var host = pkg.config.devHost;

var server = new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer);

server.listen(port, host, function(err) {
  if (err)
    return console.log(err);

  console.log('Listening at http://' + host  + ':' + port);
});