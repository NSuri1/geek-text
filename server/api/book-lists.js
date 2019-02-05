import express from 'express';
import listService from '../services/book-list';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createlist);
router.post('/update/:id', updateList);
router.get('/:id', fetchListsById);
router.get('/', fetchLists);

function createlist(request, response) {
	crud.create(listService, request, response);
}

function updateList(request, response) {
	crud.update(listService, request, response);
}

function fetchLists(request, response) {
	crud.fetch(listService, request, response);
}

function fetchListsById(request, response) {
	crud.fetchById(listService, request, response);
}

export default {router};
