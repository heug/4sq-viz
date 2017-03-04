const express = require('express');

const get4sqData = require('./app');

const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/api/test', (req, res, next) => {
	return res.json(get4sqData);
})

console.log('listening on port 1337');
app.listen(1337);
