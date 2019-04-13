import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./BookInfo.css";
import { api } from "../../../api/ApiProvider";
import decode from "jwt-decode";
import { BrowserRouter as Router, Route } from 'react-router-dom'



class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  buildKeyValueDiv(heading, value) {
    return (
      <div>
        <div className="heading">{heading}:</div>
        <div>{value}</div>
      </div>
    );
  }

  handleAddBookToCart = savedForLater => {
    // This is testing a sample cart created through POST

    try {
      let user = decode(localStorage.getItem("token"));

      api.getUserById(user.id, result => {
        let data = JSON.parse(result);
        api.getShoppingCartById(
          data.results.shopping_cart_id,
          response => {
            this.parseIntoBooks(response, savedForLater);
          },
          error => {
            console.error(error);
            setTimeout(() => {
              console.log("Trying network request again...");
              this.handleAddBookToCart(savedForLater);
            }, 5000);
          }
        );
      });
    } catch (err) {
      console.log("Error, user is not logged in");
      // Move user to login page
    }
  };

  parseIntoBooks(response, savedForLater) {
    response = JSON.parse(response).results;
    var bookArray = [];
    var someJson;
    var wasBookFoundAlready = false;

    for (var i = 0; i < response.books.length; i++) {
      // Check if the book is already in the cart, if it is, update the quantity
      if (this.props.book._id == response.books[i].book_id) {
        someJson = {
          shopping_cart_item_id: response.books[i].shopping_cart_item_id,
          book_id: response.books[i].book_id,
          price: response.books[i].price,
          quantity: response.books[i].quantity + 1,
          saved_for_later: savedForLater
        };
        wasBookFoundAlready = true;
      } else {
        someJson = {
          shopping_cart_item_id: response.books[i].shopping_cart_item_id,
          book_id: response.books[i].book_id,
          price: response.books[i].price,
          quantity: response.books[i].quantity,
          saved_for_later: response.books[i].saved_for_later
        };
      }
      bookArray.push(someJson);
    }

    if (!wasBookFoundAlready) {
      api.getBookById(
        this.props.book._id,
        response => {
          var book = JSON.parse(response).results;
          this.parseIntoBook(book, bookArray, savedForLater);
        },
        error => {
          console.error(error);
          setTimeout(() => {
            console.log("Trying network request again...");
          }, 5000);
        }
      );
    } else {
      this.updateShoppingCart(bookArray);
    }
  }

  parseIntoBook(book, bookArray, savedForLater) {
    var mongoObjectId = function () {
      var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      return (
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase()
      );
    };

    var newBook = {
      shopping_cart_item_id: mongoObjectId(),
      book_id: book._id,
      price: book.price,
      quantity: 1,
      saved_for_later: savedForLater
    };

    bookArray.push(newBook);

    this.updateShoppingCart(bookArray);
  }

  updateShoppingCart(updates) {
    let user = decode(localStorage.getItem("token"));

    var formattedUpdates = {
      books: updates
    };

    console.log(formattedUpdates);

    api.getUserById(user.id, result => {
      let userData = JSON.parse(result);
      console.log(userData.results.shopping_cart_id);
      api.updateCart(
        userData.results.shopping_cart_id,
        formattedUpdates,
        result => {
          console.log(result);
        }
      );
    });
  }

  render() {
    const { book, genre } = this.props;
    return (
      <div className="bookInfoSubContainer">
        <div>
          <div className="title">{book.title}</div>
        </div>
        <div className="heading">Author(s):</div>
        <div>
          {book.authors.map((author, index) => {
            let viewString;
            if (index < book.authors.length - 1) {
              viewString = `${author.name}, `;
            } else {
              viewString = author.name;
            }
            return (
              <Link
                to={{
                  pathname: `/author-books/${author._id}`,
                  state: { author }
                }}
                style={{ color: "white" }}
                key={author.name}
              >
                {viewString}
              </Link>
            );
          })}
        </div>
        {this.buildKeyValueDiv("Ratings", `${book.rating / 2}/5.0`)}
        {this.buildKeyValueDiv("Genre", genre ? genre.name : "Unknown")}
        {this.buildKeyValueDiv("Description", book.description)}
        {this.buildKeyValueDiv(
          "Publishing Info",
          `Published ${new Date(book.published_on).toLocaleDateString()} by ${
          book.publisher
          }`
        )}
        {this.buildKeyValueDiv("Other Info", `ISBN: ${book.isbn13}`)}
        <div className="button-container">
          <div
            style={{ cursor: "pointer" }}
            className="action-button"
            onClick={this.handleAddBookToCart.bind(this, false)}
          >
            Add To Cart
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="action-button"
            onClick={this.handleAddBookToCart.bind(this, true)}
          >
            Save For Later
          </div>
        </div>
      </div>
    );
  }
}

BookInfo.propTypes = {
  book: PropTypes.object,
  genre: PropTypes.object
};

export default BookInfo;
