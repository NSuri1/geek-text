import express from 'express';
import books from './books';

const router = new express.Router();

router.use('/books', books.router);

router.all('*', (req, res) => {
    res.status(400).json({
        error: 'invalid resource'
    });
});

export default router;