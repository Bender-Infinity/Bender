import React from 'react';

export default (props) => (console.log('nav should be rendering'),
  <div id="nav">
    <div id="room-id" height="100" width="100"></div>
    <ul id="collapseUI">
      <li className="ui">
        <img id="dcCollapse" title="Draw with friends" src="../images/icons/draw.png"/>
      </li>
      <li className="ui">
        <img id="chatCollapse" onClick={() => props.collapse('chat')} title="Chat" src="../images/icons/enable_chat.png" />
      </li>
      <li className="ui">
        <p>Room name</p>
        <input type="text" id="room-id"/>
      </li>
      <li className="ui">
        <img id="open-room" title="Create a Room" src="../images/icons/create-room.png"/>
      </li>
      <li className="ui">
        <img id="join-room" title="Join a Room" src="../images/icons/join_room.png"/>
      </li>
      <li className="ui" id="AutoJoinRoom" >
        <h3>Auto Join Room</h3>
      </li>
      <div id="room-urls">
      </div>
    </ul>
  </div>
	)