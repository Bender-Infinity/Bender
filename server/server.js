const express = require('express');
const routes = require('./routes.js');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const port = 3000;

app.use(function(req, res, next) {
  //console.log('Request of type: ' + req.method + ', to: ' + req.url);
  next();
});

app.use(routes);

http.listen(port, () => {
  console.log('Working on Bender∞ on port ' + port);
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
	})
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log('chat message sent: ', msg)
    io.emit('chat message', msg);
  });
});