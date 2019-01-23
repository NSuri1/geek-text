const database = require('../src/db.js');
const assert = require('assert');
const data = JSON.parse(require('fs').readFileSync('data/mock_db.json'), 'utf8');

database.connect({}, () => {
  for (var key in data) {
    database.db.collection(key).insertMany(data[key], (err, result) => {
      assert.equal(err, null);
      console.log(result);
    });
  }
  database.close();
});
