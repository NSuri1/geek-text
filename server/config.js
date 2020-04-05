import dotenv from 'dotenv';

dotenv.config();

const config = {
	port: process.env.PORT || 3001,
	db: {
		username: process.env.MONGODB_USERNAME || '',
		password: process.env.MONGODB_PASSWORD || '',
		url: process.env.MONGODB_URL || 'mongo:27017',
		name: process.env.MONGODB_TABLE_NAME || 'geek-text',
	},
	secretOrKey: 'secret',

};

export default config;
