import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Splash from './components/Splash.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/notFound.jsx';

export default class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			username:'',
			roomId:''
		}
	}

	submitHandler(e) {
		// console.log('e',e)
  //   console.log('this', this)
  //   console.log('this props', this.props)
		e.preventDefault();

    var userName = document.getElementById('inputName').value;
    window.localStorage.user = userName;

    var roomId = document.getElementById('createRoom').value;
    window.localStorage.roomId = roomId
		// var userName = this.saveName();
	 // var roomId = document.getElementById('createRoom').value;
	 // console.log('roomId', roomId)
		// connection.openOrJoin(roomId, function(isRoomExists, roomId) {
	 //    if(!isRoomExists) {
	 //      console.log('room does not exist');
	 //    }
	 // });
		this.setState({
			username:userName,
			roomId:roomId
		});
     // this.props.router.push({roomId})
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
        <Route path='/' component={() => <Splash username={this.state.username} roomId={this.state.roomId} submitHandler={this.submitHandler.bind(this)} /> }  />
        <Route path='/home' component={Home} />
        <Route path='*' component={Splash} />
      </Router>
    )
  }
}