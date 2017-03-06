import React from 'react';
import Nav from './Nav.jsx';
import Sketch from './Sketch.jsx';
import Chat from './Chat.jsx';
import Clock from './Clock.jsx'

//chat's fucked

export default (props) => (
  <div id="superContainer">
    <Clock />
    <Nav collapse={props.collapse} popOut={props.popOutHandler}/>
    <Sketch />
  </div>
)