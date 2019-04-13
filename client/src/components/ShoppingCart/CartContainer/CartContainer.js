import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./CartContainer.css";
import BookContainer from "./BookContainer/BookContainer.js";

class CartContainer extends Component {
  render() {
    return this.props.books.map(book => (
      <div key={book.book_id}>
        <BookContainer
          key={book.book_id}
          book={book}
          handleRemoveBookFromCart={this.props.handleRemoveBookFromCart}
          handleChangeBookQuantity={this.props.handleChangeBookQuantity}
          handleSaveForLater={this.props.handleSaveForLater}
        />
        <hr className="line-seperator" />
      </div >
    ));
  }
}

CartContainer.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object)
};

export default CartContainer;
