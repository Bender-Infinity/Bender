//entry point
//TODO: routing

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/notFound.jsx';
import App from './App.jsx'


 //ReactDOM.render(<Splash />, document.getElementById('splash'))
 //ReactDOM.render(<ChatRoom />, document.getElementById('app'))
  ReactDOM.render(<App />, document.getElementById('app'))