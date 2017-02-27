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

	render() {
		return (
		
		<Nav />
		
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'))