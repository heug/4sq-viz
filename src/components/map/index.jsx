import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getAccount, getMapTime } from '../../actions';
import mapboxgl from 'mapbox-gl';
// import closeX from '../../assets/close-button.png';
import './map.scss';

const accessTokens = require('../../config/accessTokens');
mapboxgl.accessToken = accessTokens.mapboxgl;

class SearchBar extends Component {
	render() {
		return (
			<div className="search-component">
				<div className="flex-parent">
					<div className="search-state">
						<span className="search-tag"><strong>Oakland, CA</strong><img src={closeX}/></span>
						<span className="search-tag"><strong>San Francisco, CA</strong></span>
					</div>
					<div className="save-button">
						<button>Save</button>
					</div>
				</div>
				<div className="search-filters">
					Search Filters
				</div>
			</div>
		);
	}
}

class MapboxMap extends Component {

	// componentDidMount() {
		// var map = new mapboxgl.Map({
		// 	container: 'map-display',
		// 	style: 'mapbox://styles/mapbox/streets-v9',
		// 	center: [-122.40852980833175, 37.77702490373948],
		// 	zoom: 12
		// });
		// map.on('load', () => {
		// 	map.addSource("tester", {
		// 		"type": "geojson",
		// 		"data": this.props.checkIns
		// 	});

		// 	this.props.checkIns.features.forEach((feature) => {
		// 		let symbol = feature.properties['icon'];
		// 		let layerID = 'poi-' + symbol;
		// 		if (!map.getLayer(layerID)) {
		// 			map.addLayer({
		// 				'id': layerID,
		// 				'type': 'symbol',
		// 				'source': 'tester',
		// 				'layout': {
		// 					'icon-image': symbol + '-15',
		// 					'icon-allow-overlap': true,
		// 				},
		// 				'filter': ['==', 'icon', symbol]
		// 			});
		// 		}
		// 	});
		// 	map.on('click', 'poi-marker', (e) => {
		// 		new mapboxgl.Popup()
		// 			.setLngLat(e.features[0].geometry.coordinates)
		// 			.setText(e.features[0].properties.title)
		// 			.addTo(map)
		// 	});

		// 	map.on('mouseenter', 'poi-marker', () => {
		// 		map.getCanvas().style.cursor = 'pointer';
		// 	});

		// 	map.on('mouseleave', 'poi-marker', () => {
		// 		map.getCanvas().style.cursor = '';
		// 	});
		// });
	// }

	render() {
		return (
			<div id="map-display">
				MAPMAPMAP
			</div>
		);
	}
}

class Map extends Component {

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
					<div key={category[0]} className="category-item-container">
						<div className="category-item">
							<form className="category-item">
								{category[0]}: {category[1]}
								<input name={category[0]} type="checkbox" checked="true" value={category[0]}/>	
							</form>
						</div>
					</div>
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
		// {category[0]}: {category[1]}
	}

	render() {
		return (
			<div>
				<div class="row">
					<div class="one column">
					</div>
					<div class="ten columns">
						<SearchBar/>
						<MapboxMap/>
					</div>
					<div class="one column">
					</div>
				</div>
				<div class="row">
					<div class="one column">
					</div>
					<div class="five columns">
						List of checkins
					</div>
					<div class="five columns">
						Checkin Details on click
					</div>
					<div class="one column">
					</div>
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
