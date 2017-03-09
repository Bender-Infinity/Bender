import React from 'react';
import axios from 'axios';

export default class History extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transcripts: null,
      sketches: null
    }
  }

  componentDidMount() {
    this.contextSucks(this);
    console.log('history this state', this.state)
  }

  contextSucks(context) {
    axios.get('/transcripts', { headers: { user: window.localStorage.user }})
      .then((resp) => { console.log('got transcript data', resp.data); context.setState({ transcripts: resp.data }) })
      .catch((err) => { console.log('err', err)})
    axios.get('/sketches', { headers: { user: window.localStorage.user }})
      .then((resp) => { console.log('got sketch data', resp.data); context.setState({ sketches: resp.data }) })
      .catch((err) => { console.log('ugh', err)})
  }

  hideHistory() {
    document.getElementById('scaffolding').style.visibility = 'hidden'
  }

  render() {
    return(
      <div id="scaffolding">
        <div id="historyContainer">
          <button id="closeHistory" onClick={() => {this.hideHistory()}}>X</button>
        </div>
      </div>
      )
  }
}