import React, { Component } from 'react';
import './Home.css';

import BookListing from '../BookListing';

const genres = ['Literary Fiction', 'Science and Technology'];

class Home extends Component {
	render() {
		return (
			<div className="home">
				{genres.map(genre => <BookListing key={genre} genre={genre} />)}
			</div>
		);
	}
}

export default Home;
