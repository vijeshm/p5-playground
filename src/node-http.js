// Load HTTP Module
var http = require('http');

// Create a HTTP Server and listen to port 8000 for requests
http.createServer(function(request, response) {
  // Set the response HTTP header with HTTP status and Content Type
  // response.writeHead(200, { 'Content-Type': 'text-plain' });

  // Send the response body 'hello world'
  response.end('Hello world\n');
}).listen(8000);

// Print URL for accessing the server
console.log('Server running at http://127.0.0.1:8000/');