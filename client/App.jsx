import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import './lib/sockets.js';
// import Sketch from './components/Sketch.jsx';
import Streams from './components/Streams.jsx';
import SuperContainer from './components/SuperContainer.jsx';

export default class App extends React.Component {
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

  // changeRoom() {
  // 	var newRoomSrc 
  //   var roomUrls = ['SanFrancisco4','Colosseum', 'DallasW', 'GoldenGateBridge', 'GoldenGateBridge2', 'LancellottiChapel', 'NissiBeach', 'NissiBeach2', 'Rainbow', 'SaintPetersBasilica', 'Skansen2', 'Tantolunden6'];
  //   var roomSrc = 'folder: /images/textures/' + roomUrls[0] + '/';
  //   for(var i = 0; i < roomUrls.length; i++) {
  //   	if('folder: /images/textures/' + roomUrls[i] + '/' === this.state.cubeMapSrc) {
		//     if(!roomUrls[i + 1]) {
	 //    		newRoomSrc = 'folder: /images/textures/' + roomUrls[0] +'/'
	 //    		document.getElementById('roomEnvironment').setAttribute('cubemap', newRoomSrc);
	 //    		return
	 //    		}
  //   		newRoomSrc = 'folder: /images/textures/' + roomUrls[i + 1] + '/'
  //   		this.setState({cubeMapSrc: newRoomSrc})
  //   		document.getElementById('roomEnvironment').setAttribute('cubemap', newRoomSrc);
  //   		return;
  //   	}
  //   }
  // }

	render() {
		return (
    <div>
      <Streams />
      <SuperContainer collapse={this.collapse.bind(this)}/>
    </div>
		)
	}
}

