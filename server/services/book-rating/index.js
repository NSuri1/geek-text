import BookRating from './model';
import {Severity, log} from '../../utils/logger';

const create = (list, callback) => {
	BookRating.create(list, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	BookRating.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	BookRating.find(query, (error, ratings) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : ratings);
	});
};

const fetchById = (book_id, callback) => {
	fetchAll({book: book_id}, callback);
};

export default {
	create, update, fetchAll, fetchById,
};
