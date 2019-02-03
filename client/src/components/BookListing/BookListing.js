import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import './BookListing.css';

import BookCard from '../BookCard'
import { api } from '../../api/ApiProvider';

class BookListing extends Component {
  constructor(props) {
    super(props);
    this.state = {books: []}
  }

  componentDidMount() {
    api.getBooks({genre: this.props.genre}, (result) => {
      let books = JSON.parse(result);
      this.setState({
        books: books.results || []
      })
    });
  }

  render() {
    return (
      <div className="listing-container-outer">
        <Typography variant="h6" color="inherit" className="listing-header">
          {this.props.genre}
        </Typography>
        <div className="listing-container-inner">
          {this.state.books.map(book =>
            <BookCard key={book._id} book={book}></BookCard>
          )}
        </div>
      </div>
    );
  }
}

export default BookListing;
