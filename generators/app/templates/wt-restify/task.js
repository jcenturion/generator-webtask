
var Webtask = require('webtask-tools');
var restify = require('restify');
var server  = restify.createServer({
  name:    '<%= name %>',
  version: '0.0.1'
});

server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Expose this restify server as a webtask-compatible function
module.exports = Webtask.fromRestify(server);
