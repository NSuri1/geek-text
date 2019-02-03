import React, { Component } from "react";
import './BookCard.css';

class BookCard extends Component {
  constructor(props) {
    super(props);
    this.state = {coverImage: ""}
  }
  componentDidMount() {
    api.getMedia({id: this.props.book.cover_image}, (result) => {
      let media = JSON.parse(result);
      this.setState({
        coverImage: media.base64 || []
      })
    });
  }

  render() {
    return (
      <div class="book-card">
        <img src={this.state.coverImage ? "data:image/jpeg;base64," + this.state.coverImage : ""}/>
      </div>
    );
  }
}

export default BookCard;
