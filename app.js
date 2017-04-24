const express = require('express');

const get4sqData = require('./data-helpers/app');
// const getDate = require('./data-helpers/date');

const STUB1 = require('./stubs/checkIn1');
const STUB2 = require('./stubs/checkIn2');
const STUB3 = require('./stubs/checkIn3');
const STUB4 = require('./stubs/checkIn4');

let tester = STUB1.response.checkins.items
	.concat(STUB2.response.checkins.items)
	.concat(STUB3.response.checkins.items)
	.concat(STUB4.response.checkins.items);

const app = express();

app.use(express.static(__dirname + '/src'));

app.get('/api/test/venues', (req, res, next) => {
	return res.json(get4sqData.getCategoryCount(tester));
});

app.get('/api/test/categories', (req, res, next) => {
	return res.json(get4sqData.getGeojson(tester));
});

// TODO: Create Filtering Mechanism for venues (pagination)
app.get('/api/filter', (req, res, next) => {
	var start = req.query.start;	
});

app.get('*', (req, res) => {
  return res.sendFile(__dirname + '/src/index.html');
});

console.log('listening on port 1337');
app.listen(1337);
