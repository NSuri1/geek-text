import express from 'express'
import cartService from '../services/shopping-cart'

const router = new express.Router()

router.post('/new', createdCart)
router.get('/', fetchCarts)

function createdCart(request, response) {
    let result = cartService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchCarts(request, response) {
    let result = cartService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
