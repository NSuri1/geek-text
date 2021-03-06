import express from 'express';
import creditCardService from '../services/credit-card';
import crud from './_crud';

//input validation
import validateCreateInput from '../validation/CreateCard';
import validateUpdateInput from '../validation/updateCard';

const router = new express.Router();

router.post('/new', createCreditCard);
router.post('/update/:id', updateCreditCard);
router.post('/remove/:id', removeCard);
router.get('/:id', fetchCreditCardsById);
router.get('/', fetchCreditCards);

function createCreditCard(request, response) {
	// Form validation
	const { errors, isValid} = validateCreateInput(request.body);

	// Check validation
	if(!isValid) {
		return response.status(400).json(errors);
	}

	crud.create(creditCardService, request, response);
}

async function updateCreditCard(request, response) {
	// Form validation
	const { errors, isValid} = await validateUpdateInput(request.body);
	// Check validation
	if(!isValid) {
		return response.status(400).json(errors);
	}

	crud.update(creditCardService, request, response);
}

function removeCard(request, response) {
	crud.removeById(creditCardService, request, response);
}

function fetchCreditCards(request, response) {
	crud.fetch(creditCardService, request, response);
}

function fetchCreditCardsById(request, response) {
	crud.fetchById(creditCardService, request, response);
}

export default {router};
