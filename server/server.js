import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.js';
import db from './services/db.js';
import api from './api';
import {Severity, log} from './utils/logger';
import passport from './passport';

const app = express();

// Passport middleware
app.use(passport.initialize());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((error, req, res, next) => {
	if (error instanceof SyntaxError) {
		return res.status(500).send({data: `Invalid data => ${error}`});
	}
	next();
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/api', api);

app.get('/', (req, res) => {
	res.send('Hello There!');
});

app.listen(config.port, () => {
	log(`Geek-Text server now up on http://localhost:${config.port}`, Severity.Success);
	const dbUri = (config.db.username && config.db.password)
		? `mongodb://${config.db.username}:${config.db.password}@${config.db.url}/${config.db.name}`
		: `mongodb://${config.db.url}/${config.db.name}`;
	db.connect(dbUri);
});
