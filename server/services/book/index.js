import Book from './model';

const create = (book) => {
    Book.create(book)
        .then(createdBook => {
            console.log(`Success saving book: ${createdBook}`);
            return createdBook;
        })
        .catch(error => {
            console.error(error.message);
            return null;
        });
}

export default {
    create
}