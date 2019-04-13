import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./ShoppingCart.css";
import CartContainer from "./CartContainer/CartContainer.js";
import { api } from "../../api/ApiProvider";
import decode from "jwt-decode";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      subtotal: 0
    };
  }

  componentDidMount() {
    this.fetchBooksFromCart();
  }

  fetchBooksFromCart() {
    // This is testing a sample cart created through POST
    let user = decode(localStorage.getItem("token"));

    api.getUserById(user.id, result => {
      let data = JSON.parse(result);
      console.log("here");
      api.getShoppingCartById(
        data.results.shopping_cart_id,
        response => {
          this.parseIntoBooks(response);
        },
        error => {
          console.error(error);
          setTimeout(() => {
            console.log("Trying network request again...");
            this.fetchBooksFromCart();
          }, 5000);
        }
      );
    });
  }

  parseIntoBooks(response) {
    response = JSON.parse(response).results;

    let cartTotal = 0;
    let bookArray = [];
    let someJson;

    for (let i = 0; i < response.books.length; i++) {
      someJson = {
        shopping_cart_item_id: response.books[i].shopping_cart_item_id,
        book_id: response.books[i].book_id,
        price: response.books[i].price,
        quantity: response.books[i].quantity,
        saved_for_later: response.books[i].saved_for_later
      };
      bookArray.push(someJson);
      cartTotal += response.books[i].quantity * response.books[i].price;
    }
    this.setState({ books: bookArray })

    this.calculateCartTotal(this.state.books);
  }

  calculateCartTotal(books) {
    let newTotal = 0;

    for (let i = 0; i < books.length; i++) {
      if (!books[i].saved_for_later) {
        newTotal += books[i].quantity * books[i].price;
      }
    }

    this.setState({
      subtotal: newTotal
    });
  }

  updateShoppingCart(updates) {
    let user = decode(localStorage.getItem("token"));

    let formattedUpdates = {
      books: updates
    };

    api.getUserById(user.id, result => {
      let userData = JSON.parse(result);
      console.log("here");
      api.updateCart(
        userData.results.shopping_cart_id,
        formattedUpdates,
        result => {
          let data = JSON.parse(result);
        }
      );
    });
  }

  handleRemoveBookFromCart = book_id => {
    const currentBooks = this.state.books;

    const remainingBooksAfterRemoval = currentBooks.filter(
      book => book.book_id !== book_id
    );

    this.setState({
      books: remainingBooksAfterRemoval
    });

    this.updateShoppingCart(remainingBooksAfterRemoval);

    this.calculateCartTotal(remainingBooksAfterRemoval);
  };

  handleChangeBookQuantity = (book_id, newQuantity) => {
    console.log("here");
    if (newQuantity > 0) {
      const currentBooks = this.state.books;

      const updatedBooks = currentBooks.filter(book => {
        if (book.book_id === book_id) {
          book.quantity = newQuantity;
        }

        return book;
      });

      this.setState({
        books: updatedBooks
      });

      this.updateShoppingCart(updatedBooks);
      this.calculateCartTotal(updatedBooks);
    } else {
      this.handleRemoveBookFromCart(book_id);
    }
  };

  handleSaveForLater = (book_id, isCurrentlySavedForLater) => {
    const currentBooks = this.state.books;

    const updatedBooks = currentBooks.filter(book => {
      if (book.book_id === book_id) {
        if (isCurrentlySavedForLater) {
          book.saved_for_later = false;
        } else {
          book.saved_for_later = true;
        }
      }

      return book;
    });

    this.setState({
      books: updatedBooks
    });

    this.updateShoppingCart(updatedBooks);
    this.calculateCartTotal(updatedBooks);
  };

  render() {
    // Loop through the books to find if there's one saved for SavedForLater

    let currentBook = 0;
    let booksSavedForLater = [];

    let currentBook2 = 0;
    let booksNotSavedForLater = [];

    for (let i = 0; i < this.state.books.length; i++) {
      if (this.state.books[i].saved_for_later) {
        booksSavedForLater[currentBook] = this.state.books[i];
        currentBook++;
      } else {
        booksNotSavedForLater[currentBook2] = this.state.books[i];
        currentBook2++;
      }
    }

    if (booksSavedForLater.length == 0) {
      return (
        <div className="shopping-cart-page-container">
          <h1 className="title-text">Here's Whats In Your Cart.</h1>
          <div className="free-text">Free delivery and free returns.</div>
          <div className="cart-container">
            <CartContainer
              books={booksNotSavedForLater}
              subtotal={this.state.subtotal}
              handleRemoveBookFromCart={this.handleRemoveBookFromCart}
              handleChangeBookQuantity={this.handleChangeBookQuantity}
              handleSaveForLater={this.handleSaveForLater}
            />{" "}
            <div className="totals-container">
              <div className="subtotal-text" style={{ display: "flex" }}>
                <div>Subtotal</div>
                <div style={{ textAlign: "right", width: "100%" }}>
                  ${this.state.subtotal.toFixed(2)}
                </div>
              </div>

              <div className="subtotal-text" style={{ display: "flex" }}>
                <div>Shipping</div>
                <div style={{ textAlign: "right", width: "100%" }}>FREE</div>
              </div>

              <hr />

              <div className="subtotal-text" style={{ display: "flex" }}>
                <div>Total</div>
                <div style={{ textAlign: "right", width: "100%" }}>
                  ${this.state.subtotal.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="shopping-cart-page-container">
            <h1 className="title-text">Here's Whats In Your Cart.</h1>
            <div className="free-text">Free delivery and free returns.</div>
            <div className="cart-container">
              <CartContainer
                books={booksNotSavedForLater}
                subtotal={this.state.subtotal}
                handleRemoveBookFromCart={this.handleRemoveBookFromCart}
                handleChangeBookQuantity={this.handleChangeBookQuantity}
                handleSaveForLater={this.handleSaveForLater}
              />

              <div className="totals-container">
                <div className="subtotal-text" style={{ display: "flex" }}>
                  <div>Subtotal</div>
                  <div style={{ textAlign: "right", width: "100%" }}>
                    ${this.state.subtotal.toFixed(2)}
                  </div>
                </div>

                <div className="subtotal-text" style={{ display: "flex" }}>
                  <div>Shipping</div>
                  <div style={{ textAlign: "right", width: "100%" }}>FREE</div>
                </div>

                <hr />

                <div className="subtotal-text" style={{ display: "flex" }}>
                  <div>Total</div>
                  <div style={{ textAlign: "right", width: "100%" }}>
                    ${this.state.subtotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shopping-cart-page-container">
            <h1 className="title-text">Here's Whats Saved For Later.</h1>

            <div className="cart-container">
              <CartContainer
                books={booksSavedForLater}
                subtotal={this.state.subtotal}
                handleRemoveBookFromCart={this.handleRemoveBookFromCart}
                handleChangeBookQuantity={this.handleChangeBookQuantity}
                handleSaveForLater={this.handleSaveForLater}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

ShoppingCart.propTypes = {
  books: PropTypes.object,
  subtotal: PropTypes.object
};

export default ShoppingCart;
