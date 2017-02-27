import 'aframe';
// import 'aframe-animation-component';
// import 'aframe-text-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
// import Text from './components/Text';
// import Sky from './components/Sky';
import aframe from 'aframe';
import registerVideoBillboard from 'aframe-video-billboard';

class VRScene extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 	}
	// }

	render() {
		<h1>Hello World</h1>
		<Scene id="aframe-scene">
			<a-assets>	
  		</a-assets>
  		{/******************* background image ************************/}
   		<a-entity id="roomEnvironment" cubemap="folder: /images/textures/SanFrancisco4"></a-entity>

  		{/****************************** table top ******************************/}
  		{/*<a-collada-model src="#table" position="0 -15 0" scale="20 20 20" transparent="true" opacity="0.2"></a-collada-model>*/}
  		 <a-cylinder static-body transparent="true" opacity="0.5" color="#424242" height="0.5" radius="10" position="0 -3 0"></a-cylinder>

   		{/****************************** Guest 1 ******************************/}
  		<a-video-billboard id="guest1" video-billboard="minWidth: 10;" position="-8.66 1.25 -5" rotation ="0 60 0"></a-video-billboard>
  		{/****************************** Guest 2 ******************************/}
  		<a-video-billboard id="guest2" video-billboard="minWidth: 10;" position="8.66 1.25 -5" rotation ="0 -60 0"></a-video-billboard>
  
  		{/****************************** Camera ******************************/}
  		<Camera position="0 0 10"></Camera>
 
{/*	<a-box click-drag dynamic-body color="red" position="0 5 0"></a-box>
  	<a-box click-drag dynamic-body color="green" position="0.5 7 0"></a-box>
  	<a-box click-drag dynamic-body color="yellow" position="-0.5 9 0"></a-box>
  	<a-box click-drag dynamic-body color="blue" position="0 11 0.5"></a-box>
  	<a-box click-drag dynamic-body color="purple" position="0 13 -0.5"></a-box> */}

		</Scene>
	}
}

ReactDOM.render(<VRScene />, document.getElementById('aframe-div') )