import express from 'express'
import bookService from '../services/book'

const router = new express.Router()

router.post('/new', createBook)
router.get('/', fetchBooks)

function createBook(request, response) {
    let result = bookService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchBooks(request, response) {
    let result = bookService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
