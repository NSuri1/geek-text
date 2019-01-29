import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import db from './services/db.js'
import api from './api'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(`/api`, api);

app.get('/', (req, res) => {
	res.send('Hello There!');
});

app.listen(config.port, () => {
	console.log(`Geek-Text server now up on port ${config.port}`);
	db.connect(`mongodb://${config.db.username}:${config.db.password}@${config.db.url}/${config.db.name}`);
});