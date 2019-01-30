import express from 'express'
import creditCardService from '../services/credit-card'

const router = new express.Router()

router.post('/new', createCreditCard)
router.get('/', fetchCreditCards)

function createCreditCard(request, response) {
    let result = creditCardService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchCreditCards(request, response) {
    let result = creditCardService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
