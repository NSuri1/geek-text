import Book from './model'

const create = (book) => {
    Book.create(book).then(createdBook => {
        return createdBook
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    Book.find().then(books => {
        return books
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create }
