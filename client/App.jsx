import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import './lib/sockets.js';
// import Sketch from './components/Sketch.jsx';
import Streams from './components/Streams.jsx';
import testComponent from './components/testComponent.jsx';

import SuperContainer from './components/SuperContainer.jsx';



class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
      popOut: false,
      renderMe: true
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

  popInOut () {
    var navWidth = document.getElementById('nav').style.width
    var navMarginLeft = document.getElementById('nav').style.marginLeft
    var mainWidth = document.getElementById('main').style.width
    var mainMarginLeft = document.getElementById('main').style.marginLeft
    
    if (!this.state.popOut) { 
      document.getElementById('nav').style.width = "250px";
      document.getElementById('nav').style.marginLeft = "250px";
    }
    else { 
      document.getElementById('nav').style.width = "0px";
      document.getElementById('nav').style.marginLeft = "0px";
    }
    console.log('did we even do anything', document.getElementById('nav').style.marginLeft, document.getElementById('nav').style.width)
  }

  popOutHandler() {
    // if(!this.state.popOut) {
    //   this.setState({popOut = true})
    // }
    // else {
    //   this.setState({popOut = false})
    // }

    this.setState({'popOut': !this.state.popOut})
    this.popInOut();
  }

	render() {
		return (
    <div>
      <Streams />
     <Nav collapse={this.collapse.bind(this)} popOutHandler={this.popOutHandler.bind(this)} />

      <SuperContainer collapse={this.collapse.bind(this)}/>

    </div>
		)
	}
}



ReactDOM.render(<App />, document.getElementById('app'))


