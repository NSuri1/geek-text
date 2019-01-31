import ShoppingCart from './model'

const create = (cart, callback) => {
    ShoppingCart.create(cart, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    ShoppingCart.find({}, (error, carts) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : carts)
    })
}

export default { create, fetchAll }
