var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var db = require('./db/database.js');

app.use(morgan('tiny'));

// PRODUCTION
// var https = require('https');
// var port = 443;
// var fs = require('fs');
// var options = {
//    key: fs.readFileSync('/etc/letsencrypt/live/www.will-ramsey.com/privkey.pem'),
//    cert: fs.readFileSync('/etc/letsencrypt/live/www.will-ramsey.com/cert.pem')
// };
// var server = https.createServer(options, app);


// DEVELOPMENT
var http = require('http');
var port = 3000;
var server = http.createServer(app);

app.use(express.static(__dirname + '/../public'));

var Sketches = require('./db/sketchSchema.js');
var Transcripts = require('./db/transcriptSchema.js');

app.get('/sketches', function(req,res) {
  var user = req.headers.user;
  Sketches.find({ user: user}).then(function(sketchRes) {
    res.send(sketchRes)
  })
})

app.get('/transcripts', function(req,res) {
  var user = req.headers.user;
  Transcripts.find({ user: user}).then(function(transRes) {
    res.send(transRes)
  })
})

server.listen(port);
console.log('Working on Bender∞ on port ' + port);

require('./Signaling-Server.js')(server, function(socket) {});
