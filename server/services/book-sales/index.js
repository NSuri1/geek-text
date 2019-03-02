import BookSales from './model';
import { Severity, log } from '../../utils/logger';

const create = (sales, callback) => {
	BookSales.create(sales, (error, created) => {
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
	BookSales.find(query, null, { sort: { total_sold: -1 }}, (error, sales) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : sales);
	});
};

const fetchById = (book_id, callback) => {
	fetchAll({book: book_id}, callback);
};

export default {
	create, update, fetchAll, fetchById
};
