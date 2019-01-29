import dotenv from 'dotenv';
dotenv.config();

const config = {
	"port": 5000,
	"db": {
		"username": process.env.MONGODB_USERNAME || "dummy",
		"password": process.env.MONGODB_PASSWORD || "fake",
		"url": process.env.MONGODB_URL || "localhost:27017",
		"name": process.env.MONGODB_TABLE_NAME || "geek-text"
	}
};

export default config;