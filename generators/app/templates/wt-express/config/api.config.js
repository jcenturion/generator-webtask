'use strict';

var _             = require('lodash');
var defaultConfig = require('./default.config.js');

var config = {
  localPort: 8080,
  secret:    {
  },
  param:     {
  }
};

module.exports = _.merge(defaultConfig, config);
