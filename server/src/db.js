const config = JSON.parse(require('fs').readFileSync('config.json'), 'utf8');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

class GTDatabase {
  constructor(options) {
    if (GTDatabase.instance)
      return GTDatabase.instance;

    GTDatabase.instance = this;
  }

  connect(options, callback) {
    if (this.connected) return;

    if (config && config.db) {
      this.url = config.db.url;
      this.name = config.db.name;
    }

    // options params override the default configuration
    if (options && options.url) this.url = options.url;
    if (options && options.name) this.name = options.name;

    this.dbClient = mongo(this.url, {useNewUrlParser: true});
    this.dbClient.connect((err) => {
      assert.equal(err, null);
      console.log(`Geek-Text database successfully connected`);
      this.db = this.dbClient.db(config.db.name);
      this.connected = true;
      if (callback && callback instanceof Function) callback();
    });
  }

  close() {
    if (this.dbClient) {
      this.dbClient.close();
    }
  }
}

const instance = new GTDatabase();

module.exports = instance;
