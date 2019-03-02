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

	getShoppingCartById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.carts.fetch}/${id}`;
		this._fetch(endpoint, callback, errorCallback);
	}

	updateShoppingCartById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.carts.update}/${id}`;
		this._fetch(endpoint, callback, errorCallback);
	}

	_fetch(endpoint, callback, errorCallback) {
		request(endpoint, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}
}

export const api = new ApiProvider();
