import Author from './model';
import {Severity, log} from '../../utils/logger';

const create = (author, callback) => {
	Author.create(author, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	Author.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	let fields = query['fields'] ? query['fields'].replace(',', ' ') : null;
	delete query['fields'];
	var q = Author.find(query).select(fields);

	q.exec((error, authors) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : authors);
	});
};

const fetchById = (id, callback) => {
	Author.findById(id, (error, author) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : author);
	});
};

export default {
	create, update, fetchAll, fetchById,
};
