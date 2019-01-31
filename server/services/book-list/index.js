import BookList from './model'

const create = (list, callback) => {
    BookList.create(list, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    BookList.find({}, (error, lists) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : lists)
    })
}

export default { create, fetchAll }
