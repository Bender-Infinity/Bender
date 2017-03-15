import React from 'react';
import Sketch from './Sketch.jsx';
import Chat from './Chat.jsx';
import History from './History.jsx';

export default (props) => (
  <div id="superContainer">
    <Sketch />
    <Chat />
    <History transHistory={props.transcripts} sketchHistory={props.sketches}/>
  </div>
)