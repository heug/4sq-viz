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

	displayCategories() {
		if (!this.props.account || this.props.account.length === 0) {
			return (
				<h2>No Categories!</h2>
			);
		}
		return (
			Object.keys(this.props.account).map((category) => {
				return (
					<li key={category.id}>
						{ category }
					</li>
				)
			})
		);
	}

	displayVenues(cat) {
		if (!this.props.account[cat] || this.props.account[cat].length === 0) {
			return (
				<h2>No Venues!</h2>
			);
		}
		return (
			Object.keys(this.props.account[cat].venues).map((venue) => {
				return (
					<li key={venue}>
						{ venue }
					</li>
				);
			})
		);
	}

	render() {
		return (
			<div>
				<h1>HELLO WORLD</h1>
				<br/>
				Categories
				<br/>
				<ul>
					{ this.props.account ? 
						this.displayCategories() :
						'not loaded'
					}
				</ul>
				<br/>
				Bars
				<br/>
				<ul>
					{ this.props.account ? 
						this.displayVenues('Bars') :
						'not loaded'
					}
				</ul>
				<svg width="1000" height="800"></svg>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		account: state.account.account
	};
};

const mapDispatchToProps = (dispatch) => {1
	return bindActionCreators({
		getAccount: getAccount
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
