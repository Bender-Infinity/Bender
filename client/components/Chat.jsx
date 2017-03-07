import React from 'react';

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var socket = io();

    //start voice chat
    $('#startVoice').click(function (e) {
      e.preventDefault();
      console.log('voice chat activated');
      recognition.start();
    });

    $('#endVoice').click(function (e) {
      e.preventDefault();
      recognition.stop();
      console.log('voice chat stopped');
    })


    $('#sendTextMessage').click(function(e){
      e.preventDefault();

      socket.emit('chat message', $('#m').val());
      console.log('text message sent from socket', socket);
      $('#m').val('');
      return false;
    });
      
    socket.on('chat message from server', function(msg){
      console.log('chat messaged sent', msg)
      var time = new Date();
      time = Date().substring(0, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
      console.log('chatting in socket');
      var ul = document.getElementById('messages');
      var input = document.getElementById('m');
      var li = document.createElement('LI');
      li.innerHTML = socket.nsp + ' says: ' + msg + '\n' + time;
      ul.appendChild(li);
      li.scrollIntoView();
      // if(ul.offsetHeight >= div.offsetHeight){
      //     ul.style.height = div.offsetHeight + "px";
      //   }
        //$('#messages').append($('<li>').text(socket.nsp + ' says: ' + msg));
      console.log('message to append: ', msg)
    });
  }

  render() {
    return (
      <div id="chat">
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
            <input type="text" className="speech-input" id="m" autoComplete="off" /><button id="sendTextMessage">Send</button>
          </form>
         </div>
        </div>
    )     
  }
}