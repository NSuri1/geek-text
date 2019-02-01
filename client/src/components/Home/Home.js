import React, { Component } from "react";
import './Home.css';

import BookListing from '../BookListing';

class Home extends Component {
  render() {
    return (
      <div class="home">
        <BookListing></BookListing>
        <BookListing></BookListing>
        <BookListing></BookListing>
      </div>
    );
  }
}

export default Home;
