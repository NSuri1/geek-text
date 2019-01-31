import User from './model'

const create = (user, callback) => {
    User.create(user, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    User.find({}, (error, users) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : users)
    })
}

export default { create, fetchAll }
