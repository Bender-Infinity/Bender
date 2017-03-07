//entry point
//TODO: routing
import React from 'react';
import ReactDOM from 'react-dom';
import './lib/socket.io.js';
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('app'))