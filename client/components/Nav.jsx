import React from 'react';

export default (props) => (

  <div id="nav" className="sideNav" >
    <div id="nav-container">
      <div id="room-id" height="100" width="100"></div>
      <ul id="collapseUI">
        <li className="ui">
          <p>Control Panel</p>
        </li>
        <li className="ui">
          <img id="dcCollapse" title="Sketch Pad" src="../images/icons/draw.png"/>
        </li>
        <li className="ui">
          <img id="chatCollapse" onClick={() => props.collapse('chat')} title="Chat" src="../images/icons/enable_chat.png" />
        </li>
{/*        <li className="ui">
          <p>Room name</p>
          <input type="text" id="room-id"/>
        </li>*/}
        <li className="ui">
          <img id="open-room" title="Create a Room" src="../images/icons/create-room.png"/>
        </li>
        <li className="ui" id="AutoJoinRoom">
          <img id="join-room" title="Join a Room" src="../images/icons/join_room.png"/>
        </li>
        <li className="ui">
           <img id="enable-video" title="Enable Camera" src="../images/icons/enable-camera.png"/>
        </li>
        <li className="ui">
           <img id="disable-video" title="Disable Camera" src="../images/icons/disable-camera.png"/>
        </li>
        <li className="ui">
          <img id="enable-mic" title="Enable Microphone" src="../images/icons/enable-mic.png"/>
        </li>
        <li className="ui">
          <img id="disable-mic" title="Disable Microphone" src="../images/icons/disable-mic.png"/>
        </li>
        <li className="ui">
          <img id="clearDrawing" title="Erase drawing" src="../images/icons/erase.png" onClick={() => props.clearIt()}/>
        </li>
        <div id="room-urls">
        </div>
      </ul>
    </div>
  </div>
	)