import express from 'express';
import addressService from '../services/address';
import crud from './_crud';

//input validation
import validateCreateInput from '../validation/CreateAddress';

const router = new express.Router();

router.post('/new', createAddress);
router.post('/update/:id', updateAddress);
router.post('/remove/:id', removeAddress);
router.get('/:id', fetchAddressesById);
router.get('/', fetchAddresses);

async function createAddress(request, response) {
	// Form validation
	const { errors, isValid} = validateCreateInput(request.body);

	// Check validation
	if(!isValid) {
		return response.status(400).json(errors);
	}

	crud.create(addressService, request, response);
}

function updateAddress(request, response) {
	crud.update(addressService, request, response);
}

function removeAddress(request, response) {
	crud.removeById(addressService, request, response);
}

function fetchAddresses(request, response) {
	crud.fetch(addressService, request, response);
}

function fetchAddressesById(request, response) {
	crud.fetchById(addressService, request, response);
}

export default {router};
