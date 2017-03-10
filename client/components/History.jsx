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
    this.setState({ transcripts: this.props.transHistory,
                    sketches: this.props.sketchHistory
    })
  }

  hideHistory() {
    document.getElementById('scaffolding').style.visibility = 'hidden'
  }

  render() {
    return(
      <div id="scaffolding">
        <div id="historyContainer">
          <button id="closeHistory" onClick={() => {this.hideHistory()}}>X</button>
          <p>{this.state.transcripts}</p>
        </div>
      </div>
      )
  }
}