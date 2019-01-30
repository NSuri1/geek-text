import Address from './model'

const create = (address) => {
    Address.create(address).then(createdAddress => {
        return createdAddress
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    Address.find().then(addresses => {
        return addresses
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
