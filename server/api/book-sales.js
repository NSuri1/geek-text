import express from 'express';
import bookSalesService from '../services/book-sales';
import crud from './_crud';

const router = new express.Router();

router.post('/new', createBookSales);
router.post('/update/:id', updateBookSales);
router.get('/:id', fetchBookSalesByBookId);
router.get('/', fetchBookSales);

function createBookSales(request, response) {
	crud.create(bookSalesService, request, response);
}

function updateBookSales(request, response) {
	crud.update(bookSalesService, request, response);
}

function fetchBookSales(request, response) {
	crud.fetch(bookSalesService, request, response);
}

function fetchBookSalesByBookId(request, response) {
	crud.fetchById(bookSalesService, request, response);
}

export default {router};
