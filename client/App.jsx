import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
import AFrame from './components/AFrame.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

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
	  var someString = '<a-box color="' + randomColor + '" position="0 10 0"></a-box>'
	  var wrapper = document.createElement('div');
	  wrapper.innerHTML = someString;
	  var newElem = wrapper.firstChild;
	  document.getElementById('aframe-scene').appendChild(newElem)
	  newElem.setAttribute('dynamic-body', '')
	  newElem.setAttribute('click-drag', '')
	}

  changeRoom(src) {
    src = 'folder: /images/textures/' + roomIndex + '/'
    var roomIndex = roomUrls[0];
    var roomSrc = 'folder: /images/textures/' + roomIndex + '/';
    var roomUrls = ['SanFrancisco4','Colosseum', 'DallasW', 'GoldenGateBridge', 'GoldenGateBridge2', 'LancellottiChapel', 'NissiBeach', 'NissiBeach2', 'Rainbow', 'SaintPetersBasilica', 'Skansen2', 'Tantolunden6'];
    $('#roomEnvironment').click(function (index) {
      roomIndex = roomIndex[0 + 1]
    });
    return src;
  }
					

	render() {
		return (
    <div>
		<AFrame />
    <Nav collapse={this.collapse} spawnCube={this.spawnCube} changeRoom={this.changeRoom} />
    </div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))