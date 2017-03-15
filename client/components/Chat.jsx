import React from 'react';
import recognition from '../lib/speech.js'

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var socket = io();

    $('#startVoice').click(function (e) {
      e.preventDefault();
      recognition.start();
    });

    $('#endVoice').click(function (e) {
      e.preventDefault();
      recognition.stop();
    })


    $('#sendTextMessage').click(function(e){
      e.preventDefault();
      socket.emit('chat message', { user: window.localStorage.user, message: document.getElementById('m').value });
      $('#m').val('');
      return false;
    });
      
    socket.on('chat message from server', function(msg){
      var ul = document.getElementById('messages');
      var li = document.createElement('LI');
      li.innerHTML = msg;
      ul.appendChild(li);
      li.scrollIntoView();
    });
  }

  render() {
    return (
      <div id="chat">
        <div id="message-log">
          <ul id="messages"></ul>
        </div>
        <div>
          <form id="sendMessage" placeholder="send message">
            <input type="text" className="speech-input" id="m" autoComplete="off" /><button id="sendTextMessage">Send</button>
          </form>
         </div>
        </div>
    )     
  }
}