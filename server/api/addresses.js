import express from 'express'
import addressService from '../services/address'

const router = new express.Router()

router.post('/new', createAddress)
router.get('/', fetchAddresses)

function createAddress(request, response) {
    addressService.create(request.body, (result) => {
        response.json({
            success: result != null ? true : false,
            book: result
        })
    })
}

function fetchAddresses(request, response) {
    addressService.fetchAll(result => {
      response.json({
          success: result != null ? true : false,
          books: result
      })
    })
}

export default { router }
