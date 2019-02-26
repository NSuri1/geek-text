import genresService from '../genre';
import bookSalesService from '../book-sales';
import Book from './model';
import {Severity, log} from '../../utils/logger';

const create = (book, callback) => {
	// If there is a genre in the json body then search for any
	// similar genres. If one is found pass it's id as the book's 'genre' field
	// This prevents us from using genres outside the scope of available genres,
	// and therefore makes it easier to search by genre
	genresService.fetchOneSimilarByName(book.genre, (genre) => {
		if (genre) {
			book.genre = genre._id;
			genresService.incrementBookCount(genre._id);
		}

		Book.create(book, (error, created) => {
			if (error) log(error.message, Severity.Error);
			if (callback) callback(error ? null : created);
		});
	});
};

const update = (id, updates, callback) => {
	// Same as for create. Read the comments above.
	genresService.fetchOneSimilarByName(updates.genre, (genre) => {
		if (genre) {
			book.genre = genre._id;
			genresService.incrementBookCount(genre._id);
		}

		Book.findByIdAndUpdate(id, {$set: updates}, {new: true}, (error, updated) => {
			if (error) log(error.message, Severity.Error);
			if (callback) callback(error ? null : updated);
		});
	});
};

const fetchAll = (query, callback) => {
	Book.find(query).populate('authors').exec((error, books) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : books);
	});
};

const fetchById = (id, callback) => {
	Book.findById(id).populate('authors').exec((error, book) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : book);
	});
};

const fetchTopSellers = (callback) => {
	bookSalesService.fetchAll({}, sales => {
		Book.find({'_id': { $in: sales.map(obj => obj.book) }}).populate('authors').exec((error, books) => {
			if (error) log(error.message, Severity.Error);
			if (callback) callback(error ? null : books);
		});
	});
};

const fetchTopRated = (callback) => {
	Book.find({}, null, {sort: { rating: -1 }}).limit(100).populate('authors').exec((error, books) => {
		if (error) log(error.message, Severity.Error);
		if (callback) callback(error ? null : books);
	});
};

export default {
	create, update, fetchAll, fetchById, fetchTopSellers, fetchTopRated
};
