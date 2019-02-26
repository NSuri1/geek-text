import request from 'request';
import serverConf from '../config';

class ApiProvider {
	constructor() {
		this._initialize();
	}

	_initialize() {

	}

	getBooks(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}`;
		endpoint += options.genre ? `?genre=${options.genre}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getGenres(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.genres.fetch}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getMedia(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.media.fetch}`;
		endpoint += options.id ? `/${options.id}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getBookById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getGenreById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.genres.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getTopSellers(options, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}/top-sellers`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getTopRated(options, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}/top-rated`;

		this._fetch(endpoint, callback, errorCallback);
	}

	createUser(user, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.users.register}`;

		fetch(endpoint, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type' : 'application/json'
			}
		}).then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
  		.catch(error => console.error('Error:', error));
	}

	createAddress(callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.addresses.create}`
	}

}

export const api = new ApiProvider();
