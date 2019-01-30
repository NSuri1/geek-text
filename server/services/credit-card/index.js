import CreditCard from './model'

const create = (creditCard) => {
    CreditCard.create(creditCard).then(createdCard => {
        return createdCard
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    CreditCard.find().then(creditCards => {
        return creditCards
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
