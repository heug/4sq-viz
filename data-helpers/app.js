const STUB1 = require('../stubs/checkIn1');
const STUB2 = require('../stubs/checkIn2');
const STUB3 = require('../stubs/checkIn3');
const STUB4 = require('../stubs/checkIn4');

let checkInList = STUB1.response.checkins.items
	.concat(STUB2.response.checkins.items)
	.concat(STUB3.response.checkins.items)
	.concat(STUB4.response.checkins.items);

var store = {};

// Algo for extracting categories and venues

// for (var i = 0; i < checkInList.length; i++) {
// 	if (checkInList[i].venue.categories[0]) {
// 		if (!store[checkInList[i].venue.categories[0].pluralName]) {
// 			store[checkInList[i].venue.categories[0].pluralName] = {
// 				venues: {},
// 				visitCount: 1,
// 				id: counter
// 			};
// 			counter++;
// 		} else {
// 			store[checkInList[i].venue.categories[0].pluralName].visitCount++;
// 		}
// 		if (!store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name]) {
// 			store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name] = 1;
// 		} else {
// 			store[checkInList[i].venue.categories[0].pluralName].venues[checkInList[i].venue.name]++;
// 		}
// 	}
// };

// Let's make a geojson object.
store.geojson = { "type": "FeatureCollection", "features": [] }
checkInList.forEach((item) => {
	let feature = {};
	Object.assign(feature, 
		{ "type": "Feature" },
		{ "id": item.venue.id },
		{ "geometry": Object.assign({}, 
			{ "type": "Point" },
			{ "coordinates": [item.venue.location.lng, item.venue.location.lat] }
		)},
		{ "properties": Object.assign({},
			{ "title": item.venue.name },
			{ "titleId": item.venue.id },
			{ "titleUrl": item.venue.url },
			{ "createdAt": item.createdAt },
			{ "timeZoneOffset": item.timeZoneOffset },
			{ "description": "Placeholder Text" },
			{ "icon": "marker" }
		)}
	);
	store.geojson.features.push(feature);
});

module.exports = store;
