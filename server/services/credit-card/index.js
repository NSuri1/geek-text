import CreditCard from './model'

const create = (card, callback) => {
    CreditCard.create(card, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    CreditCard.find({}, (error, cards) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : cards)
    })
}

export default { create, fetchAll }
