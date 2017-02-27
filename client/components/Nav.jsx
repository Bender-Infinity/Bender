import React from 'react';

export default () => (
	<div id="nav">
      <ul id="collapseUI" style="z-index: 5; position: absolute;">
        <li class="ui">
          <img onClick="collapse('drawingContainer')" id="dcCollapse" title="Draw with friends" src="./images/icons/draw.png"/>
        </li>
        <li class="ui">
          <img id="chatCollapse" onClick="collapse('chat')" title="Chat" src="./images/icons/enable_chat.png" />
        </li>
        <li class="ui">
          <img title="drop it like it's hot" src="./images/icons/spawnCube.png" id="spawnCube" onClick="spawnCube()"/>
        </li>
        <li class="ui"> 
          <img title="change background" src="#" onClick="changeRoom()"/>
        </li>
        {/*<!-- <button id="clockCollapse" onClick="collapse('clock')">clock</button> -->
        <!-- <section class="experiment"> -->
        <!-- <div class="make-center"> -->*/}
        <li class="ui">
          <p style="color:#89f0ef">Room name</p>
          <input style="border-radius:5px" type="text" id="room-id" value="abcdef" autocorrect="off" autocapitalize="off" size="20"/>
        </li>
        <li class="ui">
          <img id="open-room" title="Create a Room" src="./images/icons/create-room.png"/>
        </li>
        <li class="ui">
          <img id="join-room" title="Join a Room" src="./images/icons/join_room.png"/>
        </li>
        <li>
          <button id="open-or-join-room">Auto Open Or Join Room</button>
        </li>
        <div id="room-urls"></div>
      </ul>
  </div>

	)