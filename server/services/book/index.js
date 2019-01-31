import Book from './model'

const create = (book, callback) => {
    Book.create(book, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    Book.find({}, (error, books) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : books)
    })
}

export default { create, fetchAll }
