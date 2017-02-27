const http = require('http');
var express = require('express');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));

server.listen(port, process.env.IP || '0.0.0.0', function(error) {
    console.log('Working on Bender∞ on port ' + port);
});

// CURRENTLY ATTACHING TO EXPRESS HANDLER, REFACTOR SOCKET ATTACH

// require('./Signaling-Server.js')(app, function(socket) {
//     try {
//         var params = socket.handshake.query;

//         // "socket" object is totally in your own hands!
//         // do whatever you want!

//         // in your HTML page, you can access socket as following:
//         // connection.socketCustomEvent = 'custom-message';
//         // var socket = connection.getSocket();
//         // socket.emit(connection.socketCustomEvent, { test: true });

//         if (!params.socketCustomEvent) {
//             params.socketCustomEvent = 'custom-message';
//         }

//         socket.on(params.socketCustomEvent, function(message) {
//             try {
//                 socket.broadcast.emit(params.socketCustomEvent, message);
//             } catch (e) {}
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

//     } catch (e) {}
// });

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
