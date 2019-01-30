import ShoppingCart from './model'

const create = (cart) => {
    ShoppingCart.create(book).then(createdCart => {
        return createdCart
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    ShoppingCart.find().then(carts => {
        return carts
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
