import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

export default class Splash extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

	render(props) {
		return (
			<div>
				<div className="splashDiv" id="moneyShot">
					<header>
						<img id="splashLogo" src="/images/icons/logo.png"/>
					</header>
					<div>
						<h2>Connect with your team where they are</h2>
						<h3>Teamwork has never been easier</h3>
					</div>
					<div id="createRoomContainer">
						<div>
							<form id="auth">
								<h3>Create a Room</h3>
								{/*<label>will-ramsey.com/</label>*/}
								<input id="inputName" placeholder="please enter your name"/>
								<input id="createRoom" placeholder="pick any room name you want"/>
								<button type="submit" onClick={this.props.submitHandler}><Link to={`/home${this.props.roomId}`}>Create</Link></button>
							</form>
						</div>
					</div>
				</div>
				<div className="splashDiv" id="tutorial">
{/*					<div className="stepsHeader">
						<h2>Here's how</h2>
					</div>*/}
					<div className="steps">	
						<img id="step1" src="/images/icons/step-1.png"/>
						<p>Step1<br/>
							Create a room name
							It can be anything you want
						</p>
					</div>
					<div className="steps">	
						<img id="step2" src="/images/icons/step-2.png"/>
						<p>Step2<br/>
							Send the link to your team
						</p>
					</div>
					<div className="steps">	
						<img src="/images/icons/step-3.png"/>
						<p>Step3<br/>
							Collaborate!
						</p>
					</div>
				</div>
			</div>
		)
	}
}