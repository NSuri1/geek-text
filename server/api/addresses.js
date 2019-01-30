import express from 'express'
import addressService from '../services/address'

const router = new express.Router()

router.post('/new', createAddress)
router.get('/', fetchAddresses)

function createAddress(request, response) {
    let result = addressService.create(request.body)

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

function fetchAddresses(request, response) {
    let result = addressService.fetchAll()

    response.json({
        success: result != null ? true : false,
        book: result
    })
}

export default { router }
