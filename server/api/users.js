import express from 'express'
import userService from '../services/user'

const router = new express.Router()

router.post('/new', createUser)
router.get('/', fetchUsers)

function createUser(request, response) {
    userService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchUsers(request, response) {
    userService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
