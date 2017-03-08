import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/notFound.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Splash} />
        <Route path='/home' component={Home} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}