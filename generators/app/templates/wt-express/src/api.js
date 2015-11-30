'use strict';
var express = require('express');
var api     = express.Router();

api.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = api;
