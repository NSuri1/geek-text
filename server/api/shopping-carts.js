import express from 'express'
import cartService from '../services/shopping-cart'

const router = new express.Router()

router.post('/new', createdCart)
router.get('/', fetchCarts)

function createdCart(request, response) {
    cartService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchCarts(request, response) {
    cartService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
