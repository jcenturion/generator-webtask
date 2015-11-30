'use strict';

var _       = require('lodash');
var express = require('express');
var http    = require('http');
var config  = require('../config/api.config');
var api     = require('./api');

var app  = express();

// inject context into all requests when running locally
app.use(function (req, res, next) {
  req.webtaskContext = {data: _.assign(config.param, config.secret, {policies: config.policies})};
  next();
})

app.use(config.baseUri, api);

console.log('Listening on port ' + config.localPort);
app.server = http.createServer(app);
app.server.listen(config.localPort);
