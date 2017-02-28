<div id="chat" style="display: none">
      <ul>
        <li><h3 style="float: inherit; margin-left: 6px;">Chat</h3></li>
        <li><h3 id="startVoice" style="float: inherit; margin-left: 6px;">Start Voice Chat</h3></li>
        <li><h3 id="endVoice" style="float: inherit; margin-left: 6px;">End Voice Chat</h3></li>
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