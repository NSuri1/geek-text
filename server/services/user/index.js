import User from './model';
import {Severity, log} from '../../utils/logger';

const create = (user, callback) => {
	User.create(user, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	User.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	User.find(query, (error, users) => {
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
	create, update, fetchAll, fetchById,
};
