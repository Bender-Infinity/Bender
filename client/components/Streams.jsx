import React from 'react';

export default class Streams extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    connection.openOrJoin(window.localStorage.roomId, function(isRoomExists, roomId) {
      if(!isRoomExists) {
        console.log('room does not exist');
      }
    });
  }
  render() {
    return(

        
        <div id="videos-container"><img id="chatLogo" src="/images/icons/logo2.png"/></div>
    )
  }
}

