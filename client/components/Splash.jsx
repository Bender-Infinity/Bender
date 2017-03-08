import React from 'react';

export default class Splash extends React.Component {

	render() {
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
								<label>will-ramsey.com/</label>
								<input placeholder="please enter your name"/>
								<input placeholder="pick any room name you want"/>
								<button type="submit">Create</button>
							</form>
						</div>
					</div>
				</div>
				<div className="splashDiv" id="tutorial">
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