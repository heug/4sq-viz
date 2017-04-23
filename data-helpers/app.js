const STUB1 = require('../stubs/checkIn1');
const STUB2 = require('../stubs/checkIn2');
const STUB3 = require('../stubs/checkIn3');
const STUB4 = require('../stubs/checkIn4');

let checkInList = STUB1.response.checkins.items
	.concat(STUB2.response.checkins.items)
	.concat(STUB3.response.checkins.items)
	.concat(STUB4.response.checkins.items);

function parseFoursquare(checkInList) {

	let store = {};
	store.geojson = { "type": "FeatureCollection", "features": [] }
	store.venues = {}

	checkInList.forEach((item) => {
		let feature = {};

		let category = item.venue.categories[0];
		if (category) {
			if (!store.venues[category.name]) {
				store.venues[category.name] = {};
				store.venues[category.name]['pluralName'] = category.pluralName;
				store.venues[category.name]['count'] = 1;
				// let categoryItem = {};
				// Object.assign(categoryItem, Object.assign({},
				// 	{ "name": category.name },
				// 	{ "pluralName": category.pluralName },
				// 	{ "count": 1 }
				// ));
				// Object.assign(store.venues, categoryItem);
			} else {
				store.venues[category.name]['count']++;
			}
		}

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
	
	return store;
}
var store = {};
store = parseFoursquare(checkInList);
console.log(store);

module.exports = store;
