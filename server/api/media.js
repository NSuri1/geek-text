import express from 'express'
import mediaService from '../services/media'

const router = new express.Router()

router.post('/new', createMedia)
router.get('/', fetchMedia)

function createMedia(request, response) {
    mediaService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchMedia(request, response) {
    mediaService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
