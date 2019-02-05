import express from 'express';
import addressService from '../services/address';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createAddress);
router.post('/update/:id', updateAddress);
router.get('/:id', fetchAddressesById);
router.get('/', fetchAddresses);

function createAddress(request, response) {
	crud.create(addressService, request, response);
}

function updateAddress(request, response) {
	crud.update(addressService, request, response);
}

function fetchAddresses(request, response) {
	crud.fetch(addressService, request, response);
}

function fetchAddressesById(request, response) {
	crud.fetchById(addressService, request, response);
}

export default {router};
