import express from 'express'
import authorService from '../services/author'
import crud from './_crud'

const router = new express.Router()

router.post('/new', createAuthor)
router.post('/update/:id', updateAuthor)
router.get('/:id', fetchAuthorsById)
router.get('/', fetchAuthors)

function createAuthor(request, response) {
    crud.create(authorService, request, response)
}

function updateAuthor(request, response) {
    crud.update(authorService, request, response)
}

function fetchAuthors(request, response) {
    crud.fetch(authorService, request, response)
}

function fetchAuthorsById(request, response) {
    crud.fetchById(authorService, request, response)
}

export default { router }
