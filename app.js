const express = require('express');

const get4sqData = require('./data-helpers/app');
// const getDate = require('./data-helpers/date');

const app = express();

app.use(express.static(__dirname + '/src'));

app.get('/api/test', (req, res, next) => {
	return res.json(get4sqData.geojson);
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
