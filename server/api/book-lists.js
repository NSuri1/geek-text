import express from 'express'
import listService from '../services/book-list'

const router = new express.Router()

router.post('/new', createlist)
router.get('/', fetchLists)

function createlist(request, response) {
    listService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchLists(request, response) {
    listService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
