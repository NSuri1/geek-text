import express from 'express'
import mediaService from '../services/media'

const router = new express.Router()

router.post('/new', createMedia)
router.get('/', fetchMedia)

function createMedia(request, response) {
    let result = mediaService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchMedia(request, response) {
    let result = mediaService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
