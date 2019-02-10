import express from 'express';
import ratingsService from '../services/book-rating';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createRating);
router.post('/update/:id', updateRating);
router.get('/:id', fetchRatingsForBook);
router.get('/', fetchRatings);

function createRating(request, response) {
	crud.create(ratingsService, request, response);
}

function updateRating(request, response) {
	crud.update(ratingsService, request, response);
}

function fetchRatings(request, response) {
	crud.fetch(ratingsService, request, response);
}

function fetchRatingsForBook(request, response) {
	crud.fetchById(ratingsService, request, response);
}

export default {router};
