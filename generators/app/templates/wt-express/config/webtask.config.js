'use strict';

var _             = require('lodash');
var defaultConfig = require('./default.config.js');

var config = {
  webtaskName:  '<%= name %>',
  webtaskToken: 'YOUR-WEBTASK-TOKEN', // install wt-cli then run wt init and finally wt profile get default
  secret:       {
  },
  param:        {
  }
};

module.exports = _.merge(defaultConfig, config);
