var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = new (require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

var express = require('express');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pri/*.json', function(req, res) {
  res.sendFile(__dirname + '/pri/' + req.params[0] + '.json');
});

app.get('/pri/*.txt', function(req, res) {
  res.sendFile(__dirname + '/pri/' + req.params[0] + '.txt');
});

app.get('/img/*.png', function(req, res) {
  res.sendFile(__dirname + '/img/' + req.params[0] + '.png');
});

app.get('/img/*.jpg', function(req, res) {
  res.sendFile(__dirname + '/img/' + req.params[0] + '.jpg');
});

app.get("/pri/*.tiff", function(req, res) {
  res.sendFile(__dirname+'/pri/'+req.params[0]+'.tiff',req.query);
});

app.get("/wrap-pri/*.tiff", function(req, res) {
  res.sendFile(__dirname+'/wrap-pri/'+req.params[0]+'.tiff',req.query);
});
app.get("/wrap-pri/*.json", function(req, res) {
  res.sendFile(__dirname+'/wrap-pri/'+req.params[0]+'.json',req.query);
});

app.get('/pri/*.jpeg', function(req, res) {
  res.sendFile(__dirname + '/pri/' + req.params[0] + '.jpeg');
});

app.get('/pri/*.png', function(req, res) {
  res.sendFile(__dirname + '/pri/' + req.params[0] + '.png');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
});
