import React, { Component } from "react";
import './BookCard.css';
import { Link } from 'react-router-dom'
import { api } from '../../api/ApiProvider';

class BookCard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {coverImage: ""}
  }

  componentDidMount() {
    this._isMounted = true;

    api.getMedia({id: this.props.book.cover_image}, (result) => {
      let media = JSON.parse(result);
      media = media.results;
      if (this._isMounted) {
        this.setState({
          coverImage: media.base64 || []
        })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
        <div className="book-card">
          <Link to={{
            pathname: "/book-details",
            state: { bookId: this.props.book._id }
          }}>
            <img 
              className="cover-image" 
              src={this.state.coverImage ? "data:image/jpeg;base64," + this.state.coverImage : ""}
              alt="Book Cover"
            />
          </Link>
        </div>

    );
  }
}

export default BookCard;
