import React from 'react';


export default class Sketch extends React.Component {
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

    var canvas  = document.getElementById('canvas');
    var container = document.getElementById('drawingContainer');
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    var context = canvas.getContext('2d');
    var socket  = io.connect();

    context.lineWidth = 1;
    context.fillStyle="#000FFF";

    var rect = container.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    canvas.onmousedown = function(e){ 
      console.log('mouse down')
      mouse.click = true; 
    };
    
    canvas.onmouseup = function(e) { 
      mouse.click = false; 
    };

    canvas.onmousemove = function(e) {

      mouse.pos.x = (e.clientX - rect.left) / width
      mouse.pos.y = (e.clientY - rect.top) / height
      mouse.move = true;
    };

    socket.on('draw_line', function (data) {
      var line = data.line;

      context.beginPath();
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
     });


    function mainLoop() {
      
      if (mouse.click && mouse.move && mouse.pos_prev) {
        socket.emit('draw_line', { user: window.localStorage.user, line: [ mouse.pos, mouse.pos_prev ] });
        mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
    }
    
    mainLoop();

    socket.on('clearit', function() {
      context.clearRect(0,0,width,height);
    });

    window.onscroll = function() { 
      rect = container.getBoundingClientRect(); 
    }

    socket.emit('init_draw');
  }


  render() {
    return (
      <div id="drawingContainer">
        <canvas id="canvas"></canvas>
      </div>
    )
  }    
}
