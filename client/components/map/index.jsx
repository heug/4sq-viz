import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getMapTime } from '../../actions';
import mapboxgl from 'mapbox-gl';
import './map.scss';

const accessTokens = require('../../../config/accessTokens');
mapboxgl.accessToken = accessTokens.mapboxgl;

const STUB_DATA = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"id": 1,
			"geometry": {
				"type": "Point",
				"coordinates": [
					-122.40852980833175,
					37.77702490373948
				]
			},
			"properties": {
				"title": "Sightglass Coffee",
				"description": "My favorite coffee!",
				"marker-symbol": "cafe-15",
				"marker-color": "#3bb2d0",
				"marker-size": "small"
			}
		},
		{
			"type": "Feature",
			"id": 2,
			"geometry": {
				"type": "Point",
				"coordinates": [
					-122.42140556016015,
					37.77704078108561
				]
			},
			"properties": {
				"title": "The Grove",
				"description": "It's a classic",
				"marker-symbol": 2,
				"marker-color": "#3bb2d0",
				"marker-size": "medium"
			}
		}
	]
}

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
		  center: [-122.40852980833175, 37.77702490373948],
		  zoom: 10
		});
		map.on('load', () => {
			console.log('loaded');
			map.addLayer({
				"id": "all",
				"type": "circle",
				"source": {
					"type": "geojson",
					"data": STUB_DATA
				}
			}, 'all');
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
