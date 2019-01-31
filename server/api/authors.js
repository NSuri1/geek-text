import express from 'express'
import authorService from '../services/author'

const router = new express.Router()

router.post('/new', createAuthor)
router.get('/', fetchAuthors)

function createAuthor(request, response) {
    authorService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchAuthors(request, response) {
    authorService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
