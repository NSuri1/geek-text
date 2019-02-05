import express from 'express';
import cartService from '../services/shopping-cart';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createdCart);
router.post('/update/:id', updateCart);
router.get('/:id', fetchCartsById);
router.get('/', fetchCarts);

function createdCart(request, response) {
	crud.create(cartService, request, response);
}

function updateCart(request, response) {
	crud.update(cartService, request, response);
}

function fetchCarts(request, response) {
	crud.fetch(cartService, request, response);
}

function fetchCartsById(request, response) {
	crud.fetchById(cartService, request, response);
}

export default {router};
