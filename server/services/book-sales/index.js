import BookSales from './model';
import {Severity, log} from '../../utils/logger';

const create = (user, callback) => {
	BookSales.create(user, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	BookSales.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	BookSales.find(query, (error, users) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : sales);
	});
};

const fetchByBookId = (book_id, callback) => {
	fetchAll({book: book_id}, callback);
};

export default {
	create, update, fetchAll, fetchByBookId,
};
