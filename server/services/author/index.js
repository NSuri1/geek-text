import Author from './model'

const create = (author, callback) => {
    Author.create(author, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    Author.find({}, (error, authors) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : authors)
    })
}

export default { create, fetchAll }
