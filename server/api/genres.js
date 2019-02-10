import express from 'express';
import genresService from '../services/genre';
import crud from './_crud';

const router = new express.Router();

router.get('/:id', fetchGenreById);
router.get('/', fetchGenres);

function fetchGenres(request, response) {
	crud.fetch(genresService, request, response);
}

function fetchGenreById(request, response) {
	crud.fetchById(genresService, request, response);
}

export default {router};
