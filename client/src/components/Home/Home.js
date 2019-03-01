import React, { Component } from 'react';
import './Home.css';

import BookListing from '../BookListing';
import { api } from '../../api/ApiProvider';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { genres: [] };
	}

	componentDidMount() {
		api.getGenres({}, (result) => {
			const genres = JSON.parse(result);
			const genresSortedByCount = genres.results.sort((a, b) => (a.count < b.count));
			const genresCulled = genresSortedByCount.filter(a => a.count !== 0);
			this.setState({
				genres: genresCulled || []
			});
		});
	}

	render() {
		return (
			<div className="home">
				<BookListing key="top-sellers" genre={{name: 'Top Sellers'}} />
				<BookListing key="top-rated" genre={{name: 'Top Rated'}} />
				{this.state.genres.map(genre => <BookListing key={genre._id} genre={genre} />)}
			</div>
		);
	}
}

export default Home;
