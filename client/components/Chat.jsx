import React from 'react';

export default (props) => (
<div id="chat" style="display: none">
  <ul>
    <li><h3>Chat</h3></li>
    <li><h3 id="startVoice">Start Voice Chat</h3></li>
    <li><h3 id="endVoice">End Voice Chat</h3></li>
  </ul>
  <div id="message-log">
    <ul id="messages"></ul>
  </div>
  <div>
    <form id="sendMessage" placeholder="send message">
      <input type="text" x-webkit-speech id="m" autocomplete="off" /><button id="sendTextMessage">Send</button>
    </form>
   </div>
  </div>    
)