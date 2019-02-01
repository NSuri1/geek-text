import Book from './model'
import { Severity, log } from '../../utils/logger'

const create = (book, callback) => {
    Book.create(book, (error, created) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : created)
    })
}

const update = (id, updates, callback) => {
    Book.findByIdAndUpdate(id, { $set: updates }, { new: true }, (error, updated) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : updated)
    })
}

const fetchAll = (callback) => {
    Book.find({}, (error, books) => {
      if (error) log(error.message, Severity.Error)
      if (callback) callback(error ? null : books)
    })
}

export default { create, update, fetchAll }
