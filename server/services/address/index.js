import Address from './model';
import {Severity, log} from '../../utils/logger';

const create = (address, callback) => {
	Address.create(address, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	Address.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	Address.find(query, (error, addresses) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : addresses);
	});
};

const fetchById = (id, callback) => {
	Address.findById(id, (error, address) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : address);
	});
};

export default {
	create, update, fetchAll, fetchById,
};
