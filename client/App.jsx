import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import AFrame from './components/AFrame.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			cubeMapSrc:'folder: /images/textures/SanFrancisco4/'
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

  spawnCube() {
	  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
	  var randomColor = colors[Math.floor(Math.random() * colors.length)];
	  var someString = '<a-box color="' + randomColor + '" position="0 5 0"></a-box>'
	  var wrapper = document.createElement('div');
	  wrapper.innerHTML = someString;
	  var newElem = wrapper.firstChild;
	  document.getElementById('aframe-scene').appendChild(newElem)
    console.log(newElem);
	  newElem.setAttribute('dynamic-body', '')
	  newElem.setAttribute('click-drag', '')
	}


  changeRoom() {
  	var newRoomSrc 
    var roomUrls = ['SanFrancisco4','Colosseum', 'DallasW', 'GoldenGateBridge', 'GoldenGateBridge2', 'LancellottiChapel', 'NissiBeach', 'NissiBeach2', 'Rainbow', 'SaintPetersBasilica', 'Skansen2', 'Tantolunden6'];
    var roomSrc = 'folder: /images/textures/' + roomUrls[0] + '/';
    for(var i = 0; i < roomUrls.length; i++) {
    	if('folder: /images/textures/' + roomUrls[i] + '/' === this.state.cubeMapSrc) {
		    if(!roomUrls[i + 1]) {
	    		newRoomSrc = 'folder: /images/textures/' + roomUrls[0] +'/'
	    		document.getElementById('roomEnvironment').setAttribute('cubemap', newRoomSrc);
	    		return
	    		}
    		newRoomSrc = 'folder: /images/textures/' + roomUrls[i + 1] + '/'
    		this.setState({cubeMapSrc: newRoomSrc})
    		document.getElementById('roomEnvironment').setAttribute('cubemap', newRoomSrc);
    		return;
    	}
    }
  }

	render() {
		return (
    <div>
    <Nav collapse={this.collapse} spawnCube={this.spawnCube} changeRoom={this.changeRoom.bind(this)} />

    <AFrame cubeMapSrc={this.state.cubeMapSrc}/>
    </div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))