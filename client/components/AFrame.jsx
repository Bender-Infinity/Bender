import 'aframe';
// import 'aframe-animation-component';
// import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Cubemap from './aframe-cubemap-component.js'
import Camera from './Camera.jsx';
// import Text from './components/Text';
// import Sky from './components/Sky';
import aframe from 'aframe';
import registerVideoBillboard from 'aframe-video-billboard';
import aframeDraggableComponent from 'aframe-click-drag-component';

class VRScene extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

  componentWillMount () {
    console.log('dirname', __dirname)
    registerVideoBillboard(window.AFRAME);
    aframeDraggableComponent(window.AFRAME);
  };

  componentDidMount () {
  };



	render() {
    return (
    <div>
      <Scene>

  			<a-assets>	
    		</a-assets>
     		
        <a-entity id="roomEnvironment" cubemap="folder: /images/textures/SanFrancisco4/"></a-entity>

    		<a-cylinder static-body transparent="true" opacity="0.5" color="#424242" height="0.5" radius="10" position="0 -3 0"></a-cylinder>

    		<a-video-billboard click-drag id="guest1" video-billboard="minWidth: 10;" position="-8.66 1.25 -5" rotation ="0 60 0"></a-video-billboard>

    		<a-video-billboard click-drag id="guest2" video-billboard="minWidth: 10;" position="8.66 1.25 -5" rotation ="0 -60 0"></a-video-billboard>

    		<Camera position="0 0 10"></Camera>
      </Scene>
    </div>
    )
	}
}

export default VRScene;









