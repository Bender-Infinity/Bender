import React from 'react';

export default (props) => (
  <div id="nav">
    <ul id="collapseUI">
      <li className="ui">
        <img onClick={() => props.collapse('drawingContainer')} id="dcCollapse" title="Draw with friends" src="./images/icons/draw.png"/>
      </li>
      <li className="ui">
        <img id="chatCollapse" onClick={() => props.collapse('chat')} title="Chat" src="./images/icons/enable_chat.png" />
      </li>
      <li className="ui">
        <img title="drop it like it's hot" src="./images/icons/spawnCube.png" id="spawnCube" onClick={() => props.spawnCube()}/>
      </li>
      <li className="ui"> 
        <img title="change background" src="./images/icons/change_room.png" onClick={() => props.changeRoom()}/>
      </li>
      <li className="ui">
        <p>Room name</p>
        <input type="text" id="room-id"/>
      </li>
      <li className="ui">
        <img id="open-room" title="Create a Room" src="./images/icons/create-room.png"/>
      </li>
      <li className="ui">
        <img id="join-room" title="Join a Room" src="./images/icons/join_room.png"/>
      </li>
      <li className="ui">
        <h3>Auto Join Room</h3>
      </li>
      <div id="room-urls">
      </div>
    </ul>
  </div>
	)