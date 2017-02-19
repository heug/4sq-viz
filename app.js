const STUB1 = require('./stubs/checkIn1');
const STUB2 = require('./stubs/checkIn2');
const STUB3 = require('./stubs/checkIn3');
const STUB4 = require('./stubs/checkIn4');

let checkInList = STUB1.response.checkins.items
	.concat(STUB2.response.checkins.items)
	.concat(STUB3.response.checkins.items)
	.concat(STUB4.response.checkins.items);

console.log(checkInList[10].venue.name);

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

for (var key in store) {
	console.log(key, store[key].visitCount);
};
