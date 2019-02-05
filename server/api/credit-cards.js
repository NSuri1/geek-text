import express from 'express';
import creditCardService from '../services/credit-card';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createCreditCard);
router.post('/update/:id', updateCreditCard);
router.get('/:id', fetchCreditCardsById);
router.get('/', fetchCreditCards);

function createCreditCard(request, response) {
	crud.create(creditCardService, request, response);
}

function updateCreditCard(request, response) {
	crud.update(creditCardService, request, response);
}

function fetchCreditCards(request, response) {
	crud.fetch(creditCardService, request, response);
}

function fetchCreditCardsById(request, response) {
	crud.fetchById(creditCardService, request, response);
}

export default {router};
