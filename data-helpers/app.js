const Trie = require('./trieDict');
const methods = {}

const dictionary = new Trie();

methods.getCategories = (categories) => {
	let store = {};
	categories.forEach((category) => {
		console.log(category.name);
	});
}

methods.buildDict = (checkInList) => {
	checkInList.forEach((item) => {
		dictionary.checkAndAdd(item.venue.location.city);
		dictionary.checkAndAdd(item.venue.location.state);
		dictionary.checkAndAdd(item.venue.location.country);
	});
}

methods.searchLocations = (query) => {
	return dictionary.searchResults(query);
}

methods.getCategoryCount = (checkInList) => {
	let store = {};
	checkInList.forEach((item) => {
		let feature = {};
		let category = item.venue.categories[0];
		if (category) {
			if (!store[category.name]) {
				store[category.name] = {};
				store[category.name]['pluralName'] = category.pluralName;
				store[category.name]['count'] = 1;
				// let categoryItem = {};
				// Object.assign(categoryItem, Object.assign({},
				// 	{ "name": category.name },
				// 	{ "pluralName": category.pluralName },
				// 	{ "count": 1 }
				// ));
				// Object.assign(store, categoryItem);
			} else {
				store[category.name]['count']++;
			}
		}
	});
	return store;
}

methods.getGeojson = (checkInList) => {
	let store = { "type": "FeatureCollection", "features": [] }
	checkInList.forEach((item) => {
		let feature = Object.assign({}, 
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
				{ "category": item.venue.categories },
				{ "description": "Placeholder Text" },
				{ "icon": "marker" }
			)}
		);
		store.features.push(feature);
	});
	return store;
}

module.exports = methods;
