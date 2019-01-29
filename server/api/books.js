import express from 'express';
import bookService from '../services/book';

const router = new express.Router()

router.post('/new', createBook)

function createBook(request, response) {
    let result = bookService.create(request.body);

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router };