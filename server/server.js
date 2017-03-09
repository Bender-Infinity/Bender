var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');

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

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});


server.listen(port);
console.log('Working on Bender∞ on port ' + port);

require('./Signaling-Server.js')(server, function(socket) {});
