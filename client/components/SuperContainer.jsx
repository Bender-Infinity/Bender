import React from 'react';
import Nav from './Nav.jsx';
import Sketch from './Sketch.jsx';
import Chat from './Chat.jsx';


export default (props) => (
  <div id="superContainer">
    <Nav collapse={props.collapse}/>
    <Sketch />
    <Chat />
  </div>
)