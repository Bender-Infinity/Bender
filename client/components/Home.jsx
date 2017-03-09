import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import Sketch from './Sketch.jsx';
import Streams from './Streams.jsx';
import Splash from './Splash.jsx';
import Footer from './Footer.jsx';

import SuperContainer from './SuperContainer.jsx';


export default class Home extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
      popOut: false,
      renderMe: true
		};
	}

  componentWillMount() {
  }

	componentDidMount () {
    console.log('username',this.props.username)
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

   //  connection.openOrJoin(window.localStorage.roomId, function(isRoomExists, roomId) {
   //    if(!isRoomExists) {
   //      console.log('room does not exist');
   //    }
   // });
         connection.open(window.localStorage.roomId, function() {
        showRoomURL(connection.sessionid);
        connection.onstream()
      });
	}

	collapse(elem) {
    var elemDisplay = document.getElementById(elem).style.display
    if (elemDisplay == 'none' || !elemDisplay) { document.getElementById(elem).style.display = 'block'; }
    else { document.getElementById(elem).style.display = 'none'}
  }

  popInOut () {
    var navWidth = document.getElementById('nav').style.width
    // var navMarginLeft = document.getElementById('nav').style.marginLeft
    // var mainWidth = document.getElementById('main').style.width
    // var mainMarginLeft = document.getElementById('main').style.marginLeft
    
    if (!this.state.popOut) { 
      document.getElementById('nav').style.width = "150px";
      // document.getElementById('main').style.marginLeft = "250px";
    }
    else { 
      document.getElementById('nav').style.width = "50px";
      // document.getElementById('main').style.marginLeft = "50px";
    }
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

  clearIt () {
    var socket = io();
    //calls for all clients to clear sketchpad
    console.log('clearing sketchpad')
    socket.emit('clear drawing');
  };

	render() {
		return (
      <div id='home'>
        <Streams />
        <Nav collapse={this.collapse} popOutHandler={this.popOutHandler.bind(this)} clearIt={this.clearIt.bind(this)}/>
        <SuperContainer collapse={this.collapse.bind(this)} />
        <Footer />
      </div>
		)
	}
}



