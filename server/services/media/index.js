import Media from './model'

const create = (media) => {
    Media.create(book).then(createdMedia => {
        return createdMedia
    }).catch(error => {
        console.error(error.message)
        return null;
    })
}

const fetchAll = () => {
    Media.find().then(media => {
        return media
    }).catch(error => {
        console.error(error.message)
        return null
    })
}

export default { create, fetchAll }
