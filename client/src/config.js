import dotenv from 'dotenv';

dotenv.config();

const config = {
	uri: `http://${process.env.SERVER_HOST || 'localhost'}:${process.env.SERVER_PORT || 5000}/api`,
	endpoints: {
		books: {
			fetch: '/books',
			create: '/books/new',
			update: '/books/update',
		},
		authors: {
			fetch: '/authors',
			create: '/authors/new',
			update: '/authors/update',
		},
		lists: {
			fetch: '/book-lists',
			create: '/book-lists/new',
			update: '/book-lists/update',
		},
		creditCards: {
			fetch: '/credit-cards',
			create: '/credit-cards/new',
			update: '/credit-cards/update',
			remove: '/credit-cards/remove'
		},
		media: {
			fetch: '/media',
			create: '/media/new',
			update: '/media/update',
		},
		carts: {
			fetch: 'shopping-carts',
			create: '/shopping-carts/new',
			update: '/shopping-carts/update',
		},
		users: {
			fetch: '/users',
			register: '/users/register',
			login: '/users/login',
			update: '/users/update',
		},
		addresses: {
			fetch: '/addresses',
			create: '/addresses/new',
			update: '/addresses/update',
			remove: '/addresses/remove'
		},
		genres: {
			fetch: '/genres'
		},
		sales: {
			fetch: '/book-sales',
			update: '/book-sales/update',
		},
		ratings: {
			fetch: '/book-ratings'
		}
	},
};

export default config;
