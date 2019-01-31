import Media from './model'

const create = (media, callback) => {
    Media.create(media, (error, created) => {
        if (error) console.log(error.message)
        if (callback) callback(error ? null : created)
    })
}

const fetchAll = (callback) => {
    Media.find({}, (error, media) => {
      if (error) console.log(error.message)
      if (callback) callback(error ? null : media)
    })
}

export default { create, fetchAll }
