import express from 'express'
import bookService from '../services/book'
import crud from './_crud'

const router = new express.Router()

router.post('/new', createBook)
router.post('/update/:id', updateBook)
router.get('/:id', fetchBookById)
router.get('/', fetchBooks)

function createBook(request, response) {

    crud.create(bookService, request, response)
}

function updateBook(request, response) {
    crud.update(bookService, request, response)
}

async function fetchBooks(request, response) {
    crud.fetch(bookService, request, response)
}

function fetchBookById(request, response) {
    crud.fetchById(bookService, request, response)
}

export default { router }
