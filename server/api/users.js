import express from 'express'
import userService from '../services/user'

const router = new express.Router()

router.post('/new', createUser)
router.get('/', fetchUsers)

function createUser(request, response) {
    let result = userService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchUsers(request, response) {
    let result = userService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
