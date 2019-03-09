import request from 'request';
import serverConf from '../config';

class ApiProvider {
	constructor() {
		this._initialize();
	}

	_initialize() {
		this._filterGetters = {
			"Title": this._partial(this.getBooks, { fields: ["title"] }),
			"Genre": this._partial(this.getGenres, { fields: ["name"] }),
			"Author": this._partial(this.getAuthors, { fields: ["name"] })
		};
	}

	filterGetters() {
		return this._filterGetters;
	}

	getBooks(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.books.fetch}`;
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `&fields=${options.fields.join(',')}` : '';
			endpoint += options.title ? `&title=${options.title}` : '';
			endpoint += options.genre ? `&genre=${options.genre}` : '';
			endpoint += options.authors ? `&authors=${options.authors}` : '';
			endpoint += options.limit ? `&limit=${options.limit}` : '';
			endpoint += options.skip ? `&skip=${options.skip}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getGenres(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.genres.fetch}`;
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getAuthors(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.authors.fetch}`;
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getMedia(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.media.fetch}`;
		endpoint += options.id ? `/${options.id}` : '';
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

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
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}/top-sellers`;
		endpoint += '?';
		endpoint += options.limit ? `limit=${options.limit}` : '';
		endpoint += options.skip ? `&skip=${options.skip}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getTopRated(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.books.fetch}/top-rated`;
		endpoint += '?';
		endpoint += options.limit ? `limit=${options.limit}` : '';
		endpoint += options.skip ? `&skip=${options.skip}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getBookTitles(callback, errorCallback) {

	}

	createUser(form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.users.register}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	logIn(form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.users.login}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	_fetch(endpoint, callback, errorCallback) {
		request(endpoint, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	_partial(func, ...argsBound) {
		return function(...args) {
			return func.call(this, ...argsBound, ...args);
		}
	}
}

export const api = new ApiProvider();
