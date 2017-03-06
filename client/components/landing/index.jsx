import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { getAccount } from '../../actions';
import './landing.scss';
// import d3 from 'd3';

// function FieldGroup(props) {
// 	const { obj, ...rest } = props;
// 	// {help && <HelpBlock>{help}</HelpBlock>}
// 	return (
// 		<FormGroup controlId={obj.id}>
// 			<ControlLabel>{obj.label}</ControlLabel>
// 			<FormControl {...rest} />
// 		</FormGroup>
// 	);
// }

class Landing extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div>
				<center>
				<h1>Landing Page</h1>
				</center>
				<div className="spacer"></div>
				<div className="hexagon"><span>
					<div className="login-box">
						<Form>
								<FormGroup controlId="email">
									<ControlLabel>E-mail or Phone Number</ControlLabel><br/>
									<FormControl type="email" id="email" placeholder="Email or phone number" />
								</FormGroup>
								<br/>
								<FormGroup controlId="password">
									<ControlLabel>Password</ControlLabel><br/>
									<FormControl type="password" id="password" placeholder="Password" />
								</FormGroup>
								<br/>
								<Button>
									Login
								</Button>
						</Form>
					</div>
				</span></div>
			</div>
		);
	}
};

export default Landing;
