import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';

export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			username:'',
			roomId:''
		}
	}

	submitHandler(e) {
		e.preventDefault();

    var userName = document.getElementById('inputName').value;
    window.localStorage.user = userName;

    var roomId = document.getElementById('createRoom').value;
    window.localStorage.roomId = roomId
		this.setState({
			username:userName,
			roomId:roomId
		});


     hashHistory.push('/home');
	}

	saveName () {
		var userName;
		var name = document.getElementById('inputName').value;
		window.localStorage.user = name;
		userName = window.localStorage.user;
		console.log('current users name', userName);
		return userName;
	}


  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={() => <Splash username={this.state.username} roomId={this.state.roomId} submitHandler={this.submitHandler.bind(this)} /> } />
        <Route path='/home' component={() => <Home username={this.state.username}/>} />
        <Route path='*' component={Splash} />
      </Router>
    )
  }
}