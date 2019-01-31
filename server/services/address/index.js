import Address from './model'

const create = (address, callback) => {
    Address.create(address, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    Address.find({}, (error, addresses) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : addresses)
    })
}

export default { create, fetchAll }
