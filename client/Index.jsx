import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';
import App from './App.jsx'

ReactDOM.render(<App />, document.getElementById('app'))