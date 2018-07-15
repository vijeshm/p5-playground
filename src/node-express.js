var express = require('express');

// importing an application module
var square = require('./square');

// importing an application router
var wikiRouter = require('./wiki');

var app = express();

app.get('/', function(req, res) {
  // We can send strings
  // res.send('Hello World!' + square.perimeter(100));
  
  // we can send json as well
  res.json({ 'hi': 'hello' });
});

// using the configured router
app.use('/wiki', wikiRouter);

// serving static files that are in 'assets' directory
app.use(express.static('assets'));

app.listen(8000, function() {
  console.log('Example app listening on port 8000!');
});