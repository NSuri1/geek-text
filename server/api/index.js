import express from 'express';
import books from './books';
import media from './media';
import authors from './authors';
import users from './users';
import addresses from './addresses';
import creditCards from './credit-cards';
import shoppingCarts from './shopping-carts';
import bookLists from './book-lists';
import genres from './genres'
import bookSales from './book-sales';
import bookRatings from './book-ratings';

const router = new express.Router();

router.use('/books', books.router);
router.use('/media', media.router);
router.use('/authors', authors.router);
router.use('/users', users.router);
router.use('/addresses', addresses.router);
router.use('/credit-cards', creditCards.router);
router.use('/shopping-carts', shoppingCarts.router);
router.use('/book-lists', bookLists.router);
router.use('/genres', genres.router);
router.use('/book-sales', bookSales.router);
router.use('/book-ratings', bookRatings.router);

router.all('*', (req, res) => {
	res.status(400).json({
		error: 'invalid resource',
	});
});

export default router;
