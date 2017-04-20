import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getMapTime } from '../../actions';
import mapboxgl from 'mapbox-gl';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './map.scss';
// import d3 from 'd3';

const accessTokens = require('../../../config/accessTokens');
mapboxgl.accessToken = accessTokens.mapboxgl;


class Map extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			checkIns: null
		}
	}

	componentWillMount() {
		this.props.getMapTime();
	}

	componentDidMount() {
		var map = new mapboxgl.Map({
		  container: 'map-display',
		  style: 'mapbox://styles/mapbox/streets-v9',
		  center: [-74.50, 40]
		});
	}

	displayCategories() {
		if (!this.props.checkIns || this.props.checkIns.length === 0) {
			return (
				<h2>No Categories!</h2>
			);
		}
		return (
			Object.keys(this.props.checkIns).map((venue) => {
				return (
					<li key={venue.id} className="category-item">
						{ venue.name }
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
				<h1>Map</h1>
				</center>
				<div className="back">
					<span onClick={this.handleBack}>Back</span>
				</div>
				<div id="map-display">
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		checkIns: state.mapTime.checkIns
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getMapTime: getMapTime
	}, dispatch);
};



export default connect(mapStateToProps, mapDispatchToProps)(Map);
