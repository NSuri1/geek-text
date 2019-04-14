# geek-text
CEN 4010 Software Engineering Group Project: An online web application bookstore.

## Getting Started with this repo
There are two ways to get this project up and running locally.

Either way, the first thing you'll need to do is clone the repo and install the necessary dependencies.

```bash
git clone https://github.com/NSuri1/geek-text.git
cd geek-text
cd server
npm i
cd ../client
npm i
cd ..
```

You also have to add some required environment variables for the server to run properly with Mongo.

```bash
touch server/.env
echo MONGODB_USERNAME={enter_username_here} >> server/.env
echo MONGODB_PASSWORD={password} >> server/.env
echo MONGODB_URL={something.mlab.com:23534} >> server/.env
echo MONGODB_TABLE_NAME={geek-text} >> server/.env
```

Now that all that is done, we should be able to start up the project. Here are the aforementioned two ways to run it (both from the root of the project):

1. Using docker-compose (Mostly used by us when deploying to production)
   
```bash
docker-compose up
```

Now you can head over to http://localhost:80 and you should be able to see the project running.

2. Using npm scripts (Mostly used by us for development)

For this approach you'll need two terminal windows, one to run the client, and one to run the server.

In the first terminal window:
```bash
cd server
npm run dev
```
And then in the second terminal window:
```bash
cd client
npm start
```

Now you can head over to http://localhost:3000 and you should be able to see the project running.

## Functionality

#### Book Browsing and Sorting -> Adrian
Users will have a simple and enjoyable way to discover new books and Authors and sort results.

**DESCRIPTION**: Allow user to browse books by genre, top sellers in our
book store, and book rating with pagination based on 10 or 20 results. Allow Sort by book title, author, price, book rating, and release date.
 
#### Profile Management -> Daniel (1)
Users can create and maintain their profiles rather than enter in their information each time they order.

**DESCRIPTION**: Users can manage their login credentials (ID, password), personal information (name, email address, home address), nickname for book rating and commenting, credit card information (multiple), and shipping address (multiple). Physical addresses, email addresses, and credit card info should be verified as valid. Passwords must meet our current security standards

#### Shopping Cart -> Daniel (2)
Users can manage items in a shopping cart for immediate or future Purchase.

**DESCRIPTION**: Users can easily access their cart from any page, view the same information displayed in the book list, change the quantity, remove it from their cart or save it for later. A subtotal for all items in their shopping cart should be displayed at the bottom. Items saved for later should appear below that.

#### Book Details -> Nalin
Users can see informative and enticing details about a book.

**DESCRIPTION**: Display book name, book cover (which can be enlarged when clicked), author and bio, book description, genre, publishing info (publisher, release date, etc.), book rating, and comments. Hyperlink author’s name to a list of other books by the same author.
