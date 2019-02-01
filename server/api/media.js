import express from 'express'
import mediaService from '../services/media'
import crud from './_crud'

const router = new express.Router()

router.post('/new', createMedia)
router.post('/update/:id', updateMedia)
router.get('/', fetchMedia)

function createMedia(request, response) {
    crud.create(mediaService, request, response)
}

function updateMedia(request, response) {
    crud.update(mediaService, request, response)
}

function fetchMedia(request, response) {
    crud.fetch(mediaService, request, response)
}

export default { router }
