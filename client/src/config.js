import dotenv from 'dotenv';
dotenv.config();

const config = {
  "uri": `http://${process.env.SERVER_HOST || "localhost"}:${process.env.SERVER_PORT || 5000}/api`,
  "endpoints": {
    "books": {
      "fetch": "/books",
      "create": "/books/new",
      "update": "/books/update"
    },
    "authors": {
      "fetch": "/authors",
      "create": "/authors/new",
      "update": "/authors/update"
    },
    "lists": {
      "fetch": "/book-lists",
      "create": "/book-lists/new",
      "update": "/book-lists/update"
    },
    "credit-cards": {
      "fetch": "/credit-cards",
      "create": "/credit-cards/new",
      "update": "/credit-cards/update"
    },
    "media": {
      "fetch": "/media",
      "create": "/media/new",
      "update": "/media/update"
    },
    "carts": {
      "fetch": "/carts",
      "create": "/carts/new",
      "update": "/carts/update"
    },
    "users": {
      "fetch": "/users",
      "create": "/users/new",
      "update": "/users/update"
    },
    "addresses": {
      "fetch": "/addresses",
      "create": "/addresses/new",
      "update": "/addresses/update"
    }
  }
};

export default config;
