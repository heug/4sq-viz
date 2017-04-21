const STUB1 = require('./stubs/checkIn1');
const STUB2 = require('./stubs/checkIn2');
const STUB3 = require('./stubs/checkIn3');
const STUB4 = require('./stubs/checkIn4');

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

// Create first pass at some sort of data object...
store.locations = [];
checkInList.forEach((item) => {
	let checkIn = {};
	Object.assign(checkIn, 
		{ id: item.id },
		{ createdAt: item.createdAt },
		{ timeZoneOffset: item.timeZoneOffset },
		{ venue: Object.assign({},
			{ id: item.venue.id },
			{ name: item.venue.name },
			{ location: Object.assign({}, 
				{ lat: item.venue.location.lat },
				{ lng: item.venue.location.lng },
				{ city: item.venue.location.city },
				{ state: item.venue.location.state })
			}
		)},
		{ categories: item.venue }
	);
	store.locations.push(checkIn);
});

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
			{ "description": "Placeholder Text" },
			{ "icon": "marker" }
		)}
	);
	store.geojson.features.push(feature);
});

// console.log(store.geojson.features[100]);


module.exports = store;