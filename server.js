const express = require('express');

const get4sqData = require('./app');
const getDate = require('./date');

const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/api/test', (req, res, next) => {
	return res.json(get4sqData);
});

app.get('/api/filter', (req, res, next) => {
	var start = req.query.start;
	
})

app.get('*', (req, res) => {
  return res.sendFile(__dirname + '/client/index.html');
});

console.log('listening on port 1337');
app.listen(1337);
