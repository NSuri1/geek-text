import express from 'express'
import authorService from '../services/author'

const router = new express.Router()

router.post('/new', createAuthor)
router.get('/', fetchAuthors)

function createAuthor(request, response) {
    let result = authorService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchAuthors(request, response) {
    let result = authorService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
