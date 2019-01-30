import express from 'express'
import listService from '../services/book-list'

const router = new express.Router()

router.post('/new', createlist)
router.get('/', fetchLists)

function createlist(request, response) {
    let result = listService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchLists(request, response) {
    let result = listService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
