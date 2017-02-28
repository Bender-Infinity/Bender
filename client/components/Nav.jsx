import React from 'react';

export default (props) => (
  <div id="nav">
    <ul id="collapseUI">
      <li class="ui">
        <img onClick={() => props.collapse('drawingContainer')} id="dcCollapse" title="Draw with friends" src="../images/icons/draw.png"/>
      </li>
      <li class="ui">
        <img id="chatCollapse" onClick={() => props.collapse('chat')} title="Chat" src="../images/icons/enable_chat.png" />
      </li>
      <li class="ui">
        <img title="drop it like it's hot" src="../images/icons/spawnCube.png" id="spawnCube" onClick={() => props.spawnCube()}/>
      </li>
      <li class="ui"> 
        <img title="change background" src="#" onClick={() => props.changeRoom()}/>
      </li>
      {<div><button id="clockCollapse" onClick={() => props.collapse('clock')}>clock</button>
      <section class="experiment" />
      <div class="make-center"></div></div>}
      <li class="ui">
        <p>Room name</p>
        <input type="text" id="room-id"/>
      </li>
      <li class="ui">
        <img id="open-room" title="Create a Room" src="../images/icons/create-room.png"/>
      </li>
      <li class="ui">
        <img id="join-room" title="Join a Room" src="../images/icons/join_room.png"/>
      </li>
      <li>
        <button id="open-or-join-room">Auto Open Or Join Room</button>
      </li>
      <div id="room-urls">
      </div>
    </ul>
  </div>
	)