'use strict'

module.exports = function (context, req, res) {
  if (req.method !== 'GET') {
    // Method Not Allowed
    res.writeHead(405);
    res.end();
  }

  res.writeHead(200, { 'Content-Type': 'text/html '});
  res.end('<h1>Hello, world!</h1>');
}
