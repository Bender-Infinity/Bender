import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav.jsx';
// import AFrame from './components/A-Frame.js'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	collapse(elem) {
    var elemDisplay = document.getElementById(elem).style.display
    if (elemDisplay == 'none' || !elemDisplay) { document.getElementById(elem).style.display = 'block'; }
    else { document.getElementById(elem).style.display = 'none'}
  }
					

	render() {
		return (
		
		<Nav collapse={this.collapse} />
		
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))