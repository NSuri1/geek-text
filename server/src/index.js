const config = JSON.parse(require('fs').readFileSync("config.json"), "utf8");
const express = require('express');
const assert = require('assert');
const mongo = require('mongodb').MongoClient;

var app = express();
var db_client = mongo(config.db.url, {useNewUrlParser: true});
var db = null;

app.get('/', (req, res) => {
	res.send("Hello there!");
});

app.listen(config.port, () => {
	console.log(`Geek-Text server now up on port ${config.port}`);
	db_client.connect((err) => {
		assert.equal(err, null);
		console.log(`Geek-Text database successfully connected`);
		db = db_client.db(config.db.name);
	});
});
