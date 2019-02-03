import React, { Component } from "react";
import './BookCard.css';

import { api } from '../../api/ApiProvider';

class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {coverImage: ""}
  }

  componentDidMount() {
    api.getMedia({id: this.props.book.cover_image}, (result) => {
      var media = JSON.parse(result);
      media = media.results;
      console.log(media);
      this.setState({
        coverImage: media.base64 || []
      })
    });
  }

  render() {
    return (
      <div className="book-card">
        <img className="cover-image" src={this.state.coverImage ? "data:image/jpeg;base64," + this.state.coverImage : ""}/>
      </div>
    );
  }
}

export default BookCard;
