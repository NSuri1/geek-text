import express from 'express';
import bookService from '../services/book';
import genresService from '../services/genre';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createBook);
router.post('/update/:id', updateBook);
router.get('/:id', fetchBookById);
router.get('/', fetchBooks);

function createBook(request, response) {
	// If there is a genre in the json body then search for any
	// similar genres. If one is found pass it's id as the book's 'genre' field
	// This prevents us from using genres outside the scope of available genres,
	// and therefore makes it easier to search by genre
	if (request.body.genre) {
		genresService.fetchOneSimilarByName(request.body.genre, (genre) => {
			if (genre) {
				request.body.genre = genre._id;
				crud.create(bookService, request, response);
			}
		});
	}
	// Otherwise, if no genre is provided, just add the book normally. The
	// genre may be added later. 
	else {
		crud.create(bookService, request, response);
	}
}

function updateBook(request, response) {
	// TODO: Make sure the genre exists, if updated
	crud.update(bookService, request, response);
}

function fetchBooks(request, response) {
	crud.fetch(bookService, request, response);
}

function fetchBookById(request, response) {
	crud.fetchById(bookService, request, response);
}

export default {router};
