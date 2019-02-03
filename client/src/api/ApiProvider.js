import request from 'request';
import serverConf from '../net.config'

class ApiProvider {
  constructor(props) {
    this._initialize();
  }

  _initialize() {

  }

  getBooks(options, callback) {
    var endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}`;
    endpoint += options.genre ? `?genre=${options.genre}` : '';

    request(endpoint, (error, response, body) => {
      if (error) console.log(error);
      if (callback) callback(body);
    })
  }

  getMedia(options, callback) {
    var endpoint = `${serverConf.uri}/${serverConf.endpoints.media.fetch}`;
    endpoint += options.id ? `/${options.id}` : '';

    request(endpoint, (error, response, body) => {
      if (error) console.log(error);
      if (callback) callback(body);
    })
  }
}

export let api = new ApiProvider();
