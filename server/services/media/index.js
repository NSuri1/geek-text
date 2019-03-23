import Media from './model';
import {Severity, log} from '../../utils/logger';

const create = (media, callback) => {
	Media.create(media, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	Media.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	let fields = query['fields'] ? query['fields'].replace(',', ' ') : null;
	delete query['fields'];
	Media.find(query, fields, (error, media) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : media);
	});
};

const fetchById = (id, callback) => {
	Media.findById(id, (error, media) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : media);
	});
};

export default {
	create, update, fetchAll, fetchById,
};
