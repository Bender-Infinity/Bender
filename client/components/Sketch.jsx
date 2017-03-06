import React from 'react';

export default class Draw extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //init mouse
    var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
    };

    // get canvas element and create context
    var canvas  = document.getElementById('canvas');
    var container = document.getElementById('drawingContainer');
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    var context = canvas.getContext('2d');
    var socket  = io.connect();
    context.lineWidth = 1;

    //define bounds
    var rect = container.getBoundingClientRect();

    // set canvas to full browser width/height
    canvas.width = width;
    canvas.height = height;

    canvas.onmousedown = function(e){ 
      // console.log('mouse down')
      mouse.click = true; 
    };
    
    canvas.onmouseup = function(e) { 
      mouse.click = false; 
    };

    canvas.onmousemove = function(e) {
      // console.log('drawing')
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = (e.clientX - rect.left) / width
      mouse.pos.y = (e.clientY - rect.top) / height
      // console.log('coords', mouse.pos.x, mouse.pos.y)
      mouse.move = true;
    };

    // draw line received from server
    socket.on('draw_line', function (data) {
      var line = data.line;

      context.beginPath();
      context.moveTo(line[0].x * width, line[0].y * height);
      // console.log('origin coords', line[0].x * width, line[0].y * height)
      context.lineTo(line[1].x * width, line[1].y * height);
      // console.log('dest coords', line[1].x * width, line[1].y * height)
      context.stroke();
     });

     // main loop, running every 25ms
     function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
        // console.log('sending to server socket', mouse.pos, mouse.pos_prev)
        // send line to to the server
        socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
        mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
    }
    mainLoop();

    socket.on('clearit', function() {
      //all clients, including emitter, clear when signal received
      context.clearRect(0,0,width,height)
    });

    window.onscroll = function() { rect = container.getBoundingClientRect(); }

    socket.emit('init_draw');
  }

  clearIt () {
    //calls for all clients to clear sketchpad
    socket.emit('clear drawing');
  };

  render() {
    return (
      <div id="drawingContainer">
        <canvas id="canvas"></canvas>
        <button id="clearDrawing" onClick={() => this.clearIt()}>Clear</button>
      </div>
    )
  }    
}
