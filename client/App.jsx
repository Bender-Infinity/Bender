import React from 'react';
import ReactDOM from 'react-dom';
// import Nav from './components/Nav.jsx';
import AFrame from './components/AFrame.jsx'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
		
		<AFrame />
		
		)
	}
}

ReactDOM.render(<AFrame />, document.getElementById('app'))