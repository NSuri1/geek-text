import BookList from './model'

const create = (list) => {
    BookList.create(list).then(createdList => {
        return createdList
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    BookList.find().then(lists => {
        return lists
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
