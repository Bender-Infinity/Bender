console.log('SOCKETS LOADING')

var socket = io();

//start voice chat
$('#startVoice').click(function () {
  console.log('voice chat activated');
  recognition.start();
});

$('#endVoice').click(function () {
  recognition.stop();
  console.log('voice chat stopped');
})


$('#sendTextMessage').click(function(e){
  e.preventDefault();

  socket.emit('chat message', $('#m').val());
	console.log('text message sent from socket', socket);
  $('#m').val('');
  return false;
});
	
socket.on('chat message from server', function(msg){
  console.log('chat messaged sent', msg)
	var time = new Date();
	time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
	console.log('chatting in socket');
  var ul = document.getElementById('messages');
  var input = document.getElementById('m');

  li = document.createElement('LI');
  li.innerHTML = socket.nsp + ' says: ' + msg + '\n' + time;
  ul.appendChild(li);
  li.scrollIntoView();
  // if(ul.offsetHeight >= div.offsetHeight){
  //     ul.style.height = div.offsetHeight + "px";
  //   }
		//$('#messages').append($('<li>').text(socket.nsp + ' says: ' + msg));
	console.log('message to append: ', msg)
});
	
	//********************************* shared drawing ****************************
var mouse = { 
  click: false,
  move: false,
  pos: {x:0, y:0},
  pos_prev: false
};
 // get canvas element and create context
 var canvas  = document.getElementById('canvas');
 var context = canvas.getContext('2d');
 var width   = 200;
 var height  = 250;
 var socket  = io.connect();
 var radius = 10;
 context.lineWidth = radius * 2;

 // set canvas to full browser width/height
 canvas.width = width;
 canvas.height = height;

canvas.onmousedown = function(e){ 
	console.log('mouse down')
	mouse.click = true; 
};
	
	canvas.onmouseup = function(e){ mouse.click = false; };

	canvas.onmousemove = function(e) {
     // console.log('drawing')
  // normalize mouse position to range 0.0 - 1.0
  mouse.pos.x = e.clientX / width
  mouse.pos.y = e.clientY / height
  mouse.move = true;
	};

	// draw line received from server
 socket.on('draw_line', function (data) {
  console.log('WE DREW A LINE')
    var line = data.line;
    context.beginPath();
    context.moveTo(line[0].x * width, line[0].y * height);
    context.lineTo(line[1].x * width, line[1].y * height);
    context.stroke();
 });

   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
      console.log('sending to server socket')
         // send line to to the server
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();


function clearIt () {
	context.clearRect(0,0,width,height)
	socket.emit('clear drawing');
};

function clearResponse() {
  context.clearRect(0,0,width,height)
};

socket.on('clearit', function() {
  clearResponse();
});

 //****************************** end shared drawing ****************************