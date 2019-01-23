const config = JSON.parse(require('fs').readFileSync('config.json'), 'utf8');
const express = require('express');
const assert = require('assert');
const db = require('./db.js');

var app = express();

app.get('/', (req, res) => {
	res.send('Hello There!');
});

app.listen(config.port, () => {
	console.log(`Geek-Text server now up on port ${config.port}`);
	db.connect();
});
