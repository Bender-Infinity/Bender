import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import './lib/sockets.js';
import Sketch from './components/Sketch.jsx';
import Streams from './components/Streams.jsx';
import testComponent from './components/testComponent.jsx';



class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
      dummy: 'dummy'
		};
	}

	componentDidMount () {

	  document.getElementById('open-room').onclick = function() {
      disableInputButtons();
      console.log('connection', connection)
      connection.open(document.getElementById('room-id').value, function() {
      	showRoomURL(connection.sessionid);
      	connection.onstream()
      });
    };

    document.getElementById('join-room').onclick = function() {
      disableInputButtons();
      connection.join(document.getElementById('room-id').value);
    };

	  document.getElementById('AutoJoinRoom').onclick = function() {
  	  disableInputButtons();
  	  connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExists, roomid) {
	      if(!isRoomExists) {
	        showRoomURL(roomid);
	      }
	  	});
		};
	}

	collapse(elem) {
    var elemDisplay = document.getElementById(elem).style.display
    if (elemDisplay == 'none' || !elemDisplay) { document.getElementById(elem).style.display = 'block'; }
    else { document.getElementById(elem).style.display = 'none'}
  }

  dragStart(event) {
    console.log('dragStart event', event)
  }
  

	render() {
		return (
    <div>
     <Nav collapse={this.collapse.bind(this)}/>
      <Streams />
      <Sketch />
    
    </div>
		)
	}
}





