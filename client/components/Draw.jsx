import React from 'react';

export default class Draw extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
    };
    // get canvas element and create context
    var canvas  = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width   = 290;
    var height  = 190;
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
  }
  render() {
    return (
      <div id="drawingContainer">
        <canvas id="canvas">
        </canvas>
        <input id="clearDrawing" type="button" value="Clear" name="clear" onClick={() => clearIt()} />
        <h3>sketch</h3>
      </div>
    )
  }    
}
