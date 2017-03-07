import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props)
  }

  startTime() {
    var time = new Date();
    time = Date().substring(15, 16) + time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', second:'numeric', hour12: true });
    document.getElementById('clock').innerHTML = time
    var t = setTimeout(() => this.startTime(), 500);
  }

  checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  componentDidMount() {
    this.startTime();
  }

  render() {
    return (
      <div id="clock"></div>
    )
  }
} 