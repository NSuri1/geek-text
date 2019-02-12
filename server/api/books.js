import express from 'express';
import bookService from '../services/book';
import genresService from '../services/genre';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createBook);
router.post('/update/:id', updateBook);
router.get('/top-sellers', fetchTopSellers);
router.get('/:id', fetchBookById);
router.get('/', fetchBooks);

function createBook(request, response) {
	crud.create(bookService, request, response);
}

function updateBook(request, response) {
	crud.update(bookService, request, response);
}

function fetchBooks(request, response) {
	crud.fetch(bookService, request, response);
}

function fetchBookById(request, response) {
	crud.fetchById(bookService, request, response);
}

function fetchTopSellers(request, response) {
	bookService.fetchTopSellers((result) => {
		response.json({
			success: result != null,
			results: result,
		});
	});
}

export default {router};
