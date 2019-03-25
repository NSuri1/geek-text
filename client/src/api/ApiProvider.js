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
		let endpoint = `${serverConf.uri}${serverConf.endpoints.genres.fetch}`;
		console.log(serverConf.uri)
		console.log(endpoint)
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getAuthors(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.authors.fetch}`;
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getMedia(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.media.fetch}`;
		endpoint += options.id ? `/${options.id}` : '';
		if (Object.keys(options).length > 0) {
			endpoint += '?';
			endpoint += options.fields && Array.isArray(options.fields) ? `fields=${options.fields.join(',')}` : '';
		}

		this._fetch(endpoint, callback, errorCallback);
	}

	getBookById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.books.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getGenreById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.genres.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getTopSellers(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.books.fetch}/top-sellers`;
		endpoint += '?';
		endpoint += options.limit ? `limit=${options.limit}` : '';
		endpoint += options.skip ? `&skip=${options.skip}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getTopRated(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.books.fetch}/top-rated`;
		endpoint += '?';
		endpoint += options.limit ? `limit=${options.limit}` : '';
		endpoint += options.skip ? `&skip=${options.skip}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getBookTitles(callback, errorCallback) {

	}

	getBookRatings(bookId, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.ratings.fetch}/${bookId}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	createUser(form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.users.register}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	logIn(form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.users.login}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	getUserById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.users.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getAddressById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.addresses.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getCardById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.creditCards.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	updateAddress(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.addresses.update}/${id}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	updateCard(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.creditCards.update}/${id}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	updateUser(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.users.update}/${id}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	createAddress(userId, type, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.addresses.create}`;

		if (type == "shipping") {
			request.post(endpoint, { form }, (error, response, body) => {
				if (error && errorCallback) errorCallback(error);
				let data = JSON.parse(body);
				if (data.success) {
					this.getUserById(userId, (result) => {
						let user = JSON.parse(result);
						user.results.shipping_addresses.push(data.results._id)
						let addresses = [{}]
						for (let i = 0; i < user.results.shipping_addresses.length; i++) {
							addresses.push({ $oid: user.results.shipping_addresses[i] })
						}
						this.updateUser(userId, { shipping_addresses: addresses }, (reply) => {
							callback(reply)
						})
					})
				}
			});
		}
		if (type == "home") {
			request.post(endpoint, { form }, (error, response, body) => {
				if (error && errorCallback) errorCallback(error);
				let data = JSON.parse(body);
				if (data.success) {
					this.updateUser(userId, { address: data.results._id }, (reply) => {
						callback(reply)
					})
				}
			});
		}
	}

	createCard(userId, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}${serverConf.endpoints.creditCards.create}`;

		request.post(endpoint, { form }, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			let data = JSON.parse(body);
			if (data.success) {
				this.getUserById(userId, (result) => {
					let user = JSON.parse(result);
					user.results.credit_cards.push({ $oid: data.results._id })
					this.updateUser(userId, { credit_cards: user.results.credit_cards }, (reply) => {
						callback(reply)
					})
				})
			}
		});
	}

	_fetch(endpoint, callback, errorCallback) {
		request(endpoint, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	_partial(func, ...argsBound) {
		return function (...args) {
			return func.call(this, ...argsBound, ...args);
		};
	}
}

export const api = new ApiProvider();
