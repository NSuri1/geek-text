import express from 'express'
import creditCardService from '../services/credit-card'

const router = new express.Router()

router.post('/new', createCreditCard)
router.get('/', fetchCreditCards)

function createCreditCard(request, response) {
    creditCardService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchCreditCards(request, response) {
    creditCardService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
