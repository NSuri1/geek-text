import Author from './model'

const create = (author) => {
    Author.create(book).then(createdAuthor => {
        return createdAuthor
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    Author.find().then(authors => {
        return authors
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
