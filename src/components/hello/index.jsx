import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getAccount } from '../../actions';
import './hello.scss';
// import d3 from 'd3';

class Hello extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			account: null,
			activeCategory: null
		}
		this.handleCategory = this.handleCategory.bind(this);
	}

	componentWillMount() {
		this.props.getAccount();
	}

	testButton() {
		console.log(Date.now());
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
					<li key={category} className="category-item" 
					onClick={this.handleCategory}>
						{ category }
					</li>
				)
			})
		);
	}

	displayVenues() {
		if (!this.state.activeCategory) {
			return (
				<h2>No Venues!</h2>
			);
		}
		return (
			Object.keys(this.props.account[this.state.activeCategory].venues)
			.map((venue) => {
				return (
					<li key={venue} className="venue-item">
						{ venue }
					</li>
				);
			})
		);
	}

	handleCategory(e) {
		this.setState({
			activeCategory: e.target.innerText
		});
	}

	handleBack() {
		browserHistory.push('/');
	}

	render() {
		return (
			<div>
				<center>
				<h1>Categories / Venues</h1>
				<Button onClick={this.testButton}>Click me!</Button>
				</center>
				<div className="back">
					<span onClick={this.handleBack}>Back</span>
				</div>
				<div className="category-list">
					<h2>Categories</h2>
					<ul>
						{ this.props.account ? 
							this.displayCategories() :
							'not loaded'
						}
					</ul>
				</div>
				<div className="venue-list">
					<h2>Venues</h2>
					<ul>
						{ this.props.account ? 
							this.displayVenues() :
							'not loaded'
						}
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		account: state.account.account
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAccount: getAccount
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
