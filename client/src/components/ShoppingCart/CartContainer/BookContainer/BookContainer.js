import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import "./BookContainer.css";
import CustomQuantitySelector from "./CustomQuantitySelector/CustomQuantitySelector.js";
import { api } from "../../../../api/ApiProvider";
import { Link } from "react-router-dom";

class BookContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempBook: null,
      title: "",
      authors: [],
      description: "",
      published_on: "",
      saved_for_later: false,
      bookCover: null
    };
  }

  componentWillMount() {
    api.getBookById(
      this.props.book.book_id,
      response => {
        var book = JSON.parse(response).results;
        this.parseIntoBook(book);
      },
      error => {
        console.error(error);
        setTimeout(() => {
          console.log("Trying network request again...");
          this.fetchBookInformation();
        }, 5000);
      }
    );
  }

  parseIntoBook(book) {
    this.setState({
      tempBook: book
    });
    this.setState({
      title: book.title
    });
    this.setState({
      description: book.description
    });
    this.setState({
      published_on: book.published_on
    });

    this.setState({
      saved_for_later: this.props.book.saved_for_later
    });

    api.getMedia({ id: book.cover_image }, result => {
      let media = JSON.parse(result);
      media = media.results;
      this.setState({
        bookCover: media.base64 || []
      });
      console.log(this.state.bookCover);
    });

    var authorNames = [];

    for (var i = 0; i < book.authors.length; i++) {
      authorNames.push(book.authors[i].name);
    }
    this.setState({
      authors: this.state.authors.concat(authorNames)
    });
  }

  render() {
    if (!this.state.saved_for_later) {
      return (
        <div className="book-container">
          <div className="photo-container">
            <img
              src={
                this.state.bookCover !== ""
                  ? "data:image/jpeg;base64," + this.state.bookCover
                  : "book-placeholder.jpg"
              }
              alt="Book Cover"
              width="130"
            />
          </div>
          <div className="book-attributes-container">
            <div className="first-row">
              <div className="book-title-div">
                <Link
                  to={{
                    pathname: "/book-details/" + this.props.book.book_id,
                    state: {
                      bookId: this.props.book.book_id,
                      book: this.state.tempBook,
                      bookCover: this.state.bookCover
                    }
                  }}
                >
                  <h1 style={{ cursor: "pointer" }} className="book-title-text">
                    {this.state.title}
                  </h1>
                </Link>
                <h1 className="book-text">
                  {" "}
                  By: {this.state.authors.join(", ")}{" "}
                </h1>
              </div>

              <div className="quantity-div">
                <CustomQuantitySelector
                  handleChangeBookQuantity={this.props.handleChangeBookQuantity}
                  book={this.props.book}
                />
              </div>

              <div className="column-3">
                <div>
                  <h1 className="price-times-quantity-text">
                    $
                    {(this.props.book.price * this.props.book.quantity).toFixed(
                      2
                    )}{" "}
                  </h1>
                </div>

                <div className="button-container">
                  <div
                    style={{ cursor: "pointer" }}
                    className="action-button"
                    onClick={this.props.handleRemoveBookFromCart.bind(
                      this,
                      this.props.book.book_id
                    )}
                  >
                    Remove
                  </div>
                </div>
                <div className="button-container">
                  <div
                    style={{ cursor: "pointer" }}
                    className="action-button"
                    onClick={this.props.handleSaveForLater.bind(
                      this,
                      this.props.book.book_id,
                      false
                    )}
                  >
                    Save For Later
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h1 className="book-text"> {this.state.description} </h1>{" "}
            <h1 className="book-text">
              {" "}
              Published: {this.state.published_on}{" "}
            </h1>
          </div>
        </div>
      );
    } else {
      return (
        <div className="book-container">
          <div className="photo-container">
            <img
              src={
                this.state.bookCover !== ""
                  ? "data:image/jpeg;base64," + this.state.bookCover
                  : "book-placeholder.jpg"
              }
              alt="Book Cover"
              width="130"
            />
          </div>
          <div className="book-attributes-container">
            <div className="first-row">
              <div className="book-title-div">
                <Link
                  to={{
                    pathname: "/book-details/" + this.props.book.book_id,
                    state: {
                      bookId: this.props.book.book_id,
                      book: this.state.tempBook,
                      bookCover: this.state.bookCover
                    }
                  }}
                >
                  <h1 style={{ cursor: "pointer" }} className="book-title-text">
                    {this.state.title}
                  </h1>
                </Link>
                <h1 className="book-text">
                  {" "}
                  By: {this.state.authors.join(", ")}{" "}
                </h1>
              </div>

              <div className="quantity-div">
                <CustomQuantitySelector
                  handleChangeBookQuantity={this.props.handleChangeBookQuantity}
                  book={this.props.book}
                />
              </div>

              <div className="column-3">
                <div>
                  <h1 className="price-times-quantity-text">
                    $
                    {(this.props.book.price * this.props.book.quantity).toFixed(
                      2
                    )}{" "}
                  </h1>
                </div>

                <div className="button-container">
                  <div
                    style={{ cursor: "pointer" }}
                    className="action-button"
                    onClick={this.props.handleSaveForLater.bind(
                      this,
                      this.props.book.book_id,
                      true
                    )}
                  >
                    Add To Cart
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <h1 className="book-text"> {this.state.description} </h1>{" "}
            <h1 className="book-text">
              {" "}
              Published: {this.state.published_on}{" "}
            </h1>
          </div>
        </div>
      );
    }
  }
}

BookContainer.propTypes = {
  book: PropTypes.object
};

export default BookContainer;
