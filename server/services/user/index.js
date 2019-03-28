import User from './model';
import {Severity, log} from '../../utils/logger';

const create = (user, callback) => {
	User.create(user, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

//if updates have to do with shipping addresses or credit cards, then the updates must be done with the MongoDB array operators.
//along with the key and values to be pushed or pulled from the db array, an extra action key must be set to add or remove
const update = (id, updates, callback) => {
	if(updates.shipping_addresses || updates.credit_cards) {
		if(updates.action == 'add') {
			delete updates.action;
			User.findByIdAndUpdate(id, {$push: updates}, {new: true}, (error, updated) => {
				if (error) log(error.message, Severity.Error);
				if (callback) callback(error ? null : updated);
			});	
		}
	 	else if(updates.action == 'remove') {
			delete updates.action;
			User.findByIdAndUpdate(id, {$pull: updates}, {new: true}, (error, updated) => {
				if (error) log(error.message, Severity.Error);
				if (callback) callback(error ? null : updated);
			});
		}
	}
	else {
		if(updates.action == 'remove') {
			delete updates.action;
			User.findByIdAndUpdate(id, {$unset: updates}, {new: true}, (error, updated) => {
				if (error) log(error.message, Severity.Error);
				if (callback) callback(error ? null : updated);
			});
		}
		else {
			User.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
				if (error) log(error.message, Severity.Error);
				if (callback) callback(error ? null : updated);
			});
		}	
	}
};

const fetchAll = (query, callback) => {
	let fields = query['fields'] ? query['fields'].replace(',', ' ') : null;
	delete query['fields'];
	User.find(query, fields, (error, users) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : users);
	});
};

const fetchById = (id, callback) => {
	User.findById(id, (error, user) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : user);
	});
};

export default {
	create, update, fetchAll, fetchById, User
};
