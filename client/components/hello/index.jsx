import React from 'react';
import d3 from 'd3';
// import store from '../../../../app.js';

const STUB1 = require('../../../stubs/checkIn1');
const STUB2 = require('../../../stubs/checkIn2');
const STUB3 = require('../../../stubs/checkIn3');
const STUB4 = require('../../../stubs/checkIn4');

var checkInList = STUB1.response.checkins.items
	.concat(STUB2.response.checkins.items)
	.concat(STUB3.response.checkins.items)
	.concat(STUB4.response.checkins.items);

var store = {};

for (var i = 0; i < checkInList.length; i++) {
	if (checkInList[i].venue.categories[0]) {
		if (!store[checkInList[i].venue.categories[0].pluralName]) {
			store[checkInList[i].venue.categories[0].pluralName] = {
				venues: {},
				visitCount: 1
			};
		} else {
			store[checkInList[i].venue.categories[0].pluralName].visitCount++;
		}
		if (!store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name]) {
			store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name] = 1;
		} else {
			store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name]++;
		}
	}
};

class Hello extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: store
		}
		// console.log(this.state.data);
	}

	render() {
		return (
			<div>
				<h1>HELLO WORLD</h1>
				<svg width="1000" height="800"></svg>
			</div>
		);
	}
};

export default Hello;
