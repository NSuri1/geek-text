import express from 'express'
import bookService from '../services/book'

const router = new express.Router()

router.post('/new', createBook)
router.get('/', fetchBooks)

function createBook(request, response) {
    bookService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchBooks(request, response) {
    bookService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
