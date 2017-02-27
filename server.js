var server = require(isUseHTTPs ? 'https' : 'http');
const http = require('http').Server(app)
var url = require('url');
var isUseHTTPs = false;
var express = require('express');
var app = express();
const io = require('socket.io')(http);

var port = 3000;

var fs = require('fs');
var path = require('path');

// if (isUseHTTPs) {
//     var options = {
//         key: fs.readFileSync('/etc/letsencrypt/live/www.will-ramsey.com/privkey.pem'),
//         cert: fs.readFileSync('/etc/letsencrypt/live/www.will-ramsey.com/cert.pem')
//     };
// }


app.use(express.static(__dirname + '/public'));

// function serverHandler(request, response) {
//     try {
//         var uri = url.parse(request.url).pathname,
//             filename = path.join(process.cwd(), uri);

//         if (filename && filename.search(/server.js|Scalable-Broadcast.js|Signaling-Server.js/g) !== -1) {
//             response.writeHead(404, {
//                 'Content-Type': 'text/plain'
//             });
//             response.write('404 Not Found: ' + path.join('/', uri) + '\n');
//             response.end();
//             return;
//         }

//         var stats;

//         try {
//             stats = fs.lstatSync(filename);

//             if (filename && filename.search(/demos/g) === -1 && stats.isDirectory()) {
//                 response.writeHead(200, {
//                     'Content-Type': 'text/html'
//                 });
//                 response.write('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/demos/"></head><body></body></html>');
//                 response.end();
//                 return;
//             }
//         } catch (e) {
//             response.writeHead(404, {
//                 'Content-Type': 'text/plain'
//             });
//             response.write('404 Not Found: ' + path.join('/', uri) + '\n');
//             response.end();
//             return;
//         }

//         if (fs.statSync(filename).isDirectory()) {
//             response.writeHead(404, {
//                 'Content-Type': 'text/html'
//             });

//             if (filename.indexOf('/demos/MultiRTC/') !== -1) {
//                 filename = filename.replace('/demos/MultiRTC/', '');
//                 filename += '/demos/MultiRTC/index.html';
//             } else if (filename.indexOf('/demos/') !== -1) {
//                 filename = filename.replace('/demos/', '');
//                 filename += '/demos/index.html';
//             } else {
//                 filename += '/demos/index.html';
//             }
//         }


//         fs.readFile(filename, 'utf8', function(err, file) {
//             if (err) {
//                 response.writeHead(500, {
//                     'Content-Type': 'text/plain'
//                 });
//                 response.write('404 Not Found: ' + path.join('/', uri) + '\n');
//                 response.end();
//                 return;
//             }

//             try {
//                 var demos = (fs.readdirSync('demos') || []);

//                 if (demos.length) {
//                     var h2 = '<h2 style="text-align:center;display:block;"><a href="https://www.npmjs.com/package/rtcmulticonnection-v3"><img src="https://img.shields.io/npm/v/rtcmulticonnection-v3.svg"></a><a href="https://www.npmjs.com/package/rtcmulticonnection-v3"><img src="https://img.shields.io/npm/dm/rtcmulticonnection-v3.svg"></a><a href="https://travis-ci.org/muaz-khan/RTCMultiConnection"><img src="https://travis-ci.org/muaz-khan/RTCMultiConnection.png?branch=master"></a></h2>';
//                     var otherDemos = '<section class="experiment" id="demos"><details><summary style="text-align:center;">Check ' + (demos.length - 1) + ' other RTCMultiConnection-v3 demos</summary>' + h2 + '<ol>';
//                     demos.forEach(function(f) {
//                         if (f && f !== 'index.html' && f.indexOf('.html') !== -1) {
//                             otherDemos += '<li><a href="/demos/' + f + '">' + f + '</a> (<a href="https://github.com/muaz-khan/RTCMultiConnection/tree/master/demos/' + f + '">Source</a>)</li>';
//                         }
//                     });
//                     otherDemos += '<ol></details></section><section class="experiment own-widgets latest-commits">';

//                     file = file.replace('<section class="experiment own-widgets latest-commits">', otherDemos);
//                 }
//             } catch (e) {}

//             try {
//                 var docs = (fs.readdirSync('docs') || []);

//                 if (docs.length) {
//                     var html = '<section class="experiment" id="docs">';
//                     html += '<details><summary style="text-align:center;">RTCMultiConnection Docs</summary>';
//                     html += '<h2 style="text-align:center;display:block;"><a href="http://www.rtcmulticonnection.org/docs/">http://www.rtcmulticonnection.org/docs/</a></h2>';
//                     html += '<ol>';

//                     docs.forEach(function(f) {
//                         if (f.indexOf('DS_Store') == -1) {
//                             html += '<li><a href="https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/' + f + '">' + f + '</a></li>';
//                         }
//                     });

//                     html += '</ol></details></section><section class="experiment own-widgets latest-commits">';

//                     file = file.replace('<section class="experiment own-widgets latest-commits">', html);
//                 }
//             } catch (e) {}

//             response.writeHead(200);
//             response.write(file, 'utf8');
//             response.end();
//         });
//     } catch (e) {
//         response.writeHead(404, {
//             'Content-Type': 'text/plain'
//         });
//         response.write('<h1>Unexpected error:</h1><br><br>' + e.stack || e.message || JSON.stringify(e));
//         response.end();
//     }
// }

// var app;

// if (isUseHTTPs) {
//     app = server.createServer(options, serverHandler);
// } else {
//     app = server.createServer(serverHandler);
// }

function runServer() {
    app = app.listen(port, process.env.IP || '0.0.0.0', function(error) {
        console.log('Working on Bender∞ in root thesis');
        console.log('Working on Bender∞ on port ' + port);
    });

    require('./Signaling-Server.js')(app, function(socket) {
      console.log('in Signaling-Server')
        try {
          var params = socket.handshake.query;

          // "socket" object is totally in your own hands!
          // do whatever you want!

          // in your HTML page, you can access socket as following:
          // connection.socketCustomEvent = 'custom-message';
          // var socket = connection.getSocket();
          // socket.emit(connection.socketCustomEvent, { test: true });

          if (!params.socketCustomEvent) {
              params.socketCustomEvent = 'custom-message';
          }

          socket.on(params.socketCustomEvent, function(message) {
              try {
                  socket.broadcast.emit(params.socketCustomEvent, message);
              } catch (e) {}
          });
        } catch (e) {}
    });

// Text chat
//listen on the connection event for incoming sockets, and I log it to the console.
io.on('connection', function (socket) {
  
  console.log('new user ' + socket.id + ' connected');
  //create event -- event listener on client side

  io.on('disconnect', function() {
    console.log('user ' + socket.id + ' disconnected')
  });

  io.on('chat message', function(msg){
    io.emit('chat message:', msg);
    //then save to the database
  });

  socket.on('chat message', function(msg){
    console.log('chat message sent: ', msg)
    io.emit('chat message', msg);
  });

  socket.on('clear drawing', function(){
    console.log('clearing drawing for everyone')
    line_history = [];
    io.emit('clearit', true);
  });
 
//shared drawing socket - send drawing to user so they can see updated drawing
  var line_history = [];
    for(var i in line_history) {  
      socket.emit('draw_line', {line: line_history[i]})
    }

    socket.on('draw_line', function(data) {
      console.log('server is receiving data from:', data)
      line_history.push(data.line);
      io.emit('draw_line', {line: data.line})
    })

});

runServer();
