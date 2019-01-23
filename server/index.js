const SERVER_PORT = 30505;

var app = require('express')()

app.get('/', (req, res) => {
	res.send("Hello there!");
});

app.listen(SERVER_PORT, () => {
	console.log(`Geek-Text server now up on port ${SERVER_PORT}`);
});
