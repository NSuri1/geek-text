import Genre from './model';
import {Severity, log} from '../../utils/logger';

const create = (genre, callback) => {
	Genre.create(user, (error, created) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : created);
	});
};

const update = (id, updates, callback) => {
	Genre.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const fetchAll = (query, callback) => {
	let fields = query['fields'] ? query['fields'].replace(',', ' ') : null;
	delete query['fields'];
	Genre.find(query, fields, {sort: {name: 1}}, (error, genres) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : genres);
	});
};

const fetchById = (id, callback) => {
	Genre.findById(id, (error, genre) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : genre);
	});
};

const fetchOneSimilarByName = (name, callback) => {
	Genre.findOne({name: /name/i}, (error, genre) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : genre);
	});
};

const incrementBookCount = (id, callback) => {
	Genre.findByIdAndUpdate(id, {$inc: {book_count: 1}}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

const decrementBookCount = (id, callback) => {
	Genre.findByIdAndUpdate(id, {$inc: {book_count: -1}}, {new: true}, (error, updated) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : updated);
	});
};

export default {
	create, update, fetchAll, fetchById, fetchOneSimilarByName,
	incrementBookCount, decrementBookCount
};
