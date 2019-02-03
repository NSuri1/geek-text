import BookList from './model'
import { Severity, log } from '../../utils/logger'

const create = (list, callback) => {
    BookList.create(list, (error, created) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : created)
    })
}

const update = (id, updates, callback) => {
    BookList.findByIdAndUpdate(id, { $set: updates }, { new: true }, (error, updated) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : updated)
    })
}

const fetchAll = (callback) => {
    BookList.find({}, (error, lists) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : lists)
    })
}

const fetchById = (id, callback) => {
    BookList.findById(id, (error, bookList) => {
        if (error) log(error.message, Severity.Error)
        if (callback) callback(error ? null : bookList)
    })
}

export default { create, update, fetchAll, fetchById }
