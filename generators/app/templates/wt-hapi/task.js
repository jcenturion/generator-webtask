var Hapi    = require('hapi');
var Webtask = require('webtask-tools');
var server  = new Hapi.Server();

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// Expose this express server as a webtask-compatible function
module.exports = Webtask.fromHapi(server);
