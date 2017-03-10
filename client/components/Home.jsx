import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import axios from 'axios';

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
      renderMe: true,
      transcripts: null,
      sketches: null
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
	};

	collapse(elem) {
    var elemDisplay = document.getElementById(elem).style.display
    if (elemDisplay == 'none' || !elemDisplay) { document.getElementById(elem).style.display = 'block'; }
    else { document.getElementById(elem).style.display = 'none'}
  };

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
  };

  popOutHandler() {
    // if(!this.state.popOut) {
    //   this.setState({popOut = true})
    // }
    // else {
    //   this.setState({popOut = false})
    // }
    this.setState({'popOut': !this.state.popOut})
    this.popInOut();
  };

  clearIt () {
    var socket = io();
    //calls for all clients to clear sketchpad
    console.log('clearing sketchpad')
    socket.emit('clear drawing', { user: window.localStorage.user });
  };

  shareScreen () {
    navigator.getUserMedia({
      audio:false,
      video:true,
      mandatory: {
        chromeMediaSource:'screen',
        maxWidth:1280,
        maxHeight:720
      },
    }, 
      function(stream){
        console.log('screen share success')
        var sharedScreen = document.createElement('video');
        sharedScreen.srcObject = stream;
        var container = document.getElementById('canvas');
        container.appendChild(sharedScreen);
        console.log('done')
      }, 
        function(){
          console.log('screen share failed')
        })

  };

  showHistory () {
    var context = this
    document.getElementById('scaffolding').style.visibility = 'visible'
    axios.get('/transcripts', { headers: { user: window.localStorage.user }})
      .then((resp) => { console.log('got transcript data', resp.data); context.setState({ transcripts: resp.data }) })
      .catch((err) => { console.log('err', err)})
    axios.get('/sketches', { headers: { user: window.localStorage.user }})
      .then((resp) => { console.log('got sketch data', resp.data); context.setState({ sketches: resp.data }); console.log('home state', context.state) })
      .catch((err) => { console.log('ugh', err)})
  }


	render() {
		return (
      <div id='home' ref="home">
        <Streams/>
        <Nav collapse={this.collapse.bind(this)} popOutHandler={this.popOutHandler.bind(this)} clearIt={this.clearIt.bind(this)} showHistory={this.showHistory.bind(this)}/>
        <SuperContainer collapse={this.collapse.bind(this)} transHistory={this.state.transcripts} sketchHistory={this.state.sketches}/>
      </div>
		)
	}
}



