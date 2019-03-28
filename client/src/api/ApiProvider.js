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
			"Author": this._partial(this.getAuthors, { fields: ["name"] }),
			"Price": this.getPricesList,
			"Rating": this.getRatingsList
		};
	}

	filterGetters() {
		return this._filterGetters;
	}

	getBooks(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}${serverConf.endpoints.books.fetch}`;
		endpoint += options.genre ? `?genre=${options.genre}` : '';
		endpoint += options.fields && Array.isArray(options.fields) ? `?fields=${options.fields.join(',')}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getGenres(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.genres.fetch}`;
		endpoint += options.fields && Array.isArray(options.fields) ? `?fields=${options.fields.join(',')}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getAuthors(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.authors.fetch}`;
		endpoint += options.fields && Array.isArray(options.fields) ? `?fields=${options.fields.join(',')}` : '';

		this._fetch(endpoint, callback, errorCallback);
	}

	getMedia(options, callback, errorCallback) {
		let endpoint = `${serverConf.uri}/${serverConf.endpoints.media.fetch}`;
		endpoint += options.id ? `/${options.id}` : '';
		endpoint += options.fields && Array.isArray(options.fields) ? `?fields=${options.fields.join(',')}` : '';

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

	getPricesList(callback, errorCallback) {

	}

	getRatingsList(callback, errorCallback) {

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

	getUserById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.users.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getAddressById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.addresses.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	getCardById(id, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.creditCards.fetch}/${id}`;

		this._fetch(endpoint, callback, errorCallback);
	}

	updateAddress(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.addresses.update}/${id}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}	

	updateCard(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.creditCards.update}/${id}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	updateUser(id, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.users.update}/${id}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			if (callback) callback(body);
		});
	}

	//the extra key "action" must be included in the update field for shipping addresses so the server knows it is adding to the db array
	createAddress(userId, type ,form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.addresses.create}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if(error && errorCallback) errorCallback(error);
			let data = JSON.parse(body);
			if(data.success) {
				if(type == "shipping") {
					this.updateUser(userId, {action: "add", shipping_addresses: data.results._id}, (reply) => {
						if(callback) callback(reply)
					})	
				}
				else if (type == "home") {
					this.updateUser(userId, {address: data.results._id} , (reply) => {
						if(callback) callback(reply)
					})
				}
			}
		});
	}

	createCard(userId, form, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.creditCards.create}`;

		request.post(endpoint, {form}, (error, response, body) => {
			if(error && errorCallback) errorCallback(error);
			let data = JSON.parse(body);
			if(data.success) {
				this.getUserById(userId, (result) => {
					let user = JSON.parse(result);
					user.results.credit_cards.push({$oid: data.results._id})
					this.updateUser(userId, {credit_cards: user.results.credit_cards}, (reply) => {
						if(callback) callback(reply)
					})
				})
			}
		});
	}

	//the extra key "action" must be included in the update field for shipping addresses so the server knows it is removing from the db array
	deleteAddressById(userId, addressId, type, callback, errorCallback) {
		const endpoint = `${serverConf.uri}/${serverConf.endpoints.addresses.remove}/${addressId}`;

		request.post(endpoint, (error, response, body) => {
			if (error && errorCallback) errorCallback(error);
			let data = JSON.parse(body);
			if(data.success) {
				if(type == "shipping") {
					this.updateUser(userId, {action: "remove", shipping_addresses: addressId}, (reply) => {
						if(callback) callback(reply)
					});
				}
				else if(type == "home"){
					this.updateUser(userId, {action: "remove", address: ""}, (reply) => {
						if(callback) callback(reply)
					});	
				}
			}	
		});


		//this removes address. now i have to remove the address id from the users data.
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
