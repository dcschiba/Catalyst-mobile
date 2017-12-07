var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');
var config = require('./webpack.config');

var app = new (require('express'))();
var port = 50000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

var express = require('express');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'www/data')));
app.use('/img', express.static(path.join(__dirname, '..', 'www/img')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
