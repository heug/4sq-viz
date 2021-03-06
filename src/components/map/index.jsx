import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { getAccount, getMapTime } from '../../actions';
import mapboxgl from 'mapbox-gl';
import './map.scss';

const closeX = '../../assets/close-button.png';
const accessTokens = require('../../config/accessTokens');
mapboxgl.accessToken = accessTokens.mapboxgl;

class SearchBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchTags: [
				{
					category: 'location',
					value: 'Oakland, CA',
					id: '1234-Oakland, CA'
				},
				{
					category: 'location',
					value: 'San Francisco, CA',
					id: '2345-San Francisco, CA'
				}
			],
			locations: [
				{
					category: 'location',
					value: 'Oakland, CA',
					id: '1234-Oakland, CA'
				},
				{
					category: 'location',
					value: 'San Francisco, CA',
					id: '2345-San Francisco, CA'
				},
				{
					category: 'location',
					value: 'New York City, NY',
					id: '3456-New York City, NY'
				},
				{
					category: 'location',
					value: 'Chicago, IL',
					id: '4567-Chicago, IL'
				}
			]
		}
	}

	addTag(obj) {
		let tagExists = this.state.searchTags.filter((tag) => {
			return tag.id === obj.id;
		})[0];
		if (!tagExists) {
			this.setState({searchTags: this.state.searchTags.concat(obj)});
		}
	}

	removeTag(tagId) {
		let newList = this.state.searchTags.slice();
		for (let i = newList.length - 1; i >= 0; i--) {
			if (newList[i].id === tagId) {
				newList.splice(i, 1);
			}
		}
		this.setState({searchTags: newList});
	}

	renderSearchTags() {
		if (this.state.searchTags.length > 0) {
			return (
				this.state.searchTags.map((tag) => {
					return (
						<span className="search-tag" key={tag.id}><strong>{tag.value}</strong><img src={closeX} className="closeX" onClick={() => this.removeTag(tag.id)}/></span>
					);
				})
			);
		}
	}

	renderLocations() {
		if (this.state.locations.length > 0) {
			return (
				this.state.locations.map((location) => {
					return (
						<div className="dropdown-row" key={location.id} onClick={() => this.addTag(location)}>
							{location.value}
						</div>
					);
				})
			);
		}
	}

	render() {
		return (
			<div className="search-component">
				<div className="flex-parent">
					<div className="search-state">
						{this.renderSearchTags()}
					</div>
					<div className="save-button">
						<button>Save</button>
					</div>
				</div>
				<div className="filter-row">
					<div className="filter-fields">
						<div className="filter-dropdown">
							Location ▾
							<div className="dropdown-group location-group hidden">
								{this.renderLocations()}
							</div>
						</div>
						<div className="filter-dropdown">
							Categories ▾
							<div className="dropdown-group category-group hidden">
								<div className="dropdown-row">
									Coffee Shops
								</div>
								<div className="dropdown-row">
									Restaurants
								</div>
								<div className="dropdown-row">
									Bars
								</div>
							</div>
						</div>
						<div className="filter-dropdown">
							Friends ▾
						</div>
						<div className="filter-dropdown">
							Date Range ▾
						</div>
					</div>
					<div className="saved-filters">
						Saved Filters ▾
					</div>
				</div>
			</div>
		);
	}
}

class MapboxMap extends Component {

	componentDidMount() {
		var map = new mapboxgl.Map({
			container: 'map-display',
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [-122.40852980833175, 37.77702490373948],
			zoom: 12
		});
		map.on('load', () => {
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

	render() {
		return (
			<div id="map-display">
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

	// componentDidMount() {
	// 	var map = new mapboxgl.Map({
	// 		container: 'map-display',
	// 		style: 'mapbox://styles/mapbox/streets-v9',
	// 		center: [-122.40852980833175, 37.77702490373948],
	// 		zoom: 12
	// 	});
	// 	map.on('load', () => {
	// 		map.addSource("tester", {
	// 			"type": "geojson",
	// 			"data": this.props.checkIns
	// 		});

	// 		this.props.checkIns.features.forEach((feature) => {
	// 			let symbol = feature.properties['icon'];
	// 			let layerID = 'poi-' + symbol;
	// 			if (!map.getLayer(layerID)) {
	// 				map.addLayer({
	// 					'id': layerID,
	// 					'type': 'symbol',
	// 					'source': 'tester',
	// 					'layout': {
	// 						'icon-image': symbol + '-15',
	// 						'icon-allow-overlap': true,
	// 					},
	// 					'filter': ['==', 'icon', symbol]
	// 				});
	// 			}
	// 		});
	// 		map.on('click', 'poi-marker', (e) => {
	// 			new mapboxgl.Popup()
	// 				.setLngLat(e.features[0].geometry.coordinates)
	// 				.setText(e.features[0].properties.title)
	// 				.addTo(map)
	// 		});

	// 		map.on('mouseenter', 'poi-marker', () => {
	// 			map.getCanvas().style.cursor = 'pointer';
	// 		});

	// 		map.on('mouseleave', 'poi-marker', () => {
	// 			map.getCanvas().style.cursor = '';
	// 		});
	// 	});
	// }

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
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="one column">
					</div>
					<div className="ten columns">
						<SearchBar/>
						<div id="map-display">
							Map goes here!
						</div>
					</div>
					<div className="one column">
					</div>
				</div>
				<div className="row">
					<div className="one column">
					</div>
					<div className="five columns">
						List of checkins
					</div>
					<div className="five columns">
						Checkin Details on click
					</div>
					<div className="one column">
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
