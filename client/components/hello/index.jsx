import React from 'react';
// import {  } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccount } from '../../actions';
// import d3 from 'd3';

class Hello extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			account: null
		}
	}

	componentWillMount() {
		this.props.getAccount();
	}

	displayList(obj) {
		// for (var key in obj) {
		// 	console.log(key);
		// }
		// if (Object.keys(this.props.))
	}

	render() {
		return (
			<div>
				<h1>HELLO WORLD</h1>
				{ this.props.account.account ? 
					this.props.account.account['Airports'].visitCount : 
					'not loaded' 
				}
				<svg width="1000" height="800"></svg>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		account: state.account
	};
};

const mapDispatchToProps = (dispatch) => {1
	return bindActionCreators({
		getAccount: getAccount
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
