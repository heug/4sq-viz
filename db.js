const pg = require('pg');

const config = {
	user: 'root',
	database: 'my_db',
	password: 'secret',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000,
};

const client = new pg.Client();

client.connect((err) => {
	if (err) { throw err; };
	
})