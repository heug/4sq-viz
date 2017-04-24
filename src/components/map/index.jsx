import React from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getAccount, getMapTime } from '../../actions';
import mapboxgl from 'mapbox-gl';
import './map.scss';

const accessTokens = require('../../config/accessTokens');
mapboxgl.accessToken = accessTokens.mapboxgl;

class Map extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			account: null,
			checkIns: null
		}
	}

	componentWillMount() {
		this.props.getAccount();
		this.props.getMapTime();
	}

	componentDidMount() {
		var map = new mapboxgl.Map({
			container: 'map-display',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [-122.40852980833175, 37.77702490373948],
			zoom: 12
		});
		map.on('load', () => {
			console.log('loaded');
			map.addSource("tester", {
				"type": "geojson",
				"data": this.props.checkIns
			});

			this.props.checkIns.features.forEach((feature) => {
				let symbol = feature.properties['icon'];
				let layerID = 'poi-' + symbol;
				if (!map.getLayer(layerID)) {
					map.addLayer({
						'id': layerID,
						'type': 'symbol',
						'source': 'tester',
						'layout': {
							'icon-image': symbol + '-15',
							'icon-allow-overlap': true,
						},
						'filter': ['==', 'icon', symbol]
					});
				}
			});
			map.on('click', 'poi-marker', (e) => {
				new mapboxgl.Popup()
					.setLngLat(e.features[0].geometry.coordinates)
					.setText(e.features[0].properties.title)
					.addTo(map)
			});

			map.on('mouseenter', 'poi-marker', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'poi-marker', () => {
				map.getCanvas().style.cursor = '';
			});
		});
	}

	displayCategories() {
		if (!this.props.account || Object.keys(this.props.account).length === 0) {
			return (
				<h2>No Categories!</h2>
			);
		}
		let store = [];
		Object.keys(this.props.account).map((category) => {
			store.push([this.props.account[category].pluralName, this.props.account[category].count]);
		});
		store.sort((a,b) => {
			return b[1] - a[1];
		});
		return (
			store.map((category) => {
				return (
					<li key={category[0]} className="category-item">
						{category[0]}: {category[1]}
					</li>
				)
			})
		);
		// return (
		// 	Object.keys(this.props.account).map((category) => {
		// 		return (
		// 			<li key={category} className="category-item">
		// 				{this.props.account[category].pluralName}: {this.props.account[category].count}
		// 			</li>
		// 		)
		// 	})
		// );
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
			<div id="map-container">
				<div id="map-main-screen">
					<div id="map-display">
					</div>
					<div id="map-filter">
						<ul>
							{this.displayCategories()}
						</ul>
					</div>
				</div>
				<div id="map-details">
					List here
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		account: state.account.account,
		checkIns: state.mapTime.checkIns
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAccount: getAccount,
		getMapTime: getMapTime
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
