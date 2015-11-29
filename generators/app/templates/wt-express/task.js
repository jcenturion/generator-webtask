var Express = require('express');
var Webtask = require('webtask-tools');
var server  = Express();

server.get('/', function (req, res) {
  res.send('Hello World!');
});

// Expose this express server as a webtask-compatible function
module.exports = Webtask.fromExpress(server);
