import User from './model'

const create = (user) => {
    User.create(book).then(createdUser => {
        return createdUser
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    User.find().then(users => {
        return users
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
