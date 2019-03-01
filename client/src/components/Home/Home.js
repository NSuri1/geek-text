import React, { Component } from 'react';
import './Home.css';

import BookListing from '../BookListing';
import { api } from '../../api/ApiProvider';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { genres: [] };
		this.onBrowseSelect = this.onBrowseSelect.bind(this);
	}

	componentDidMount() {
		this.props.onHomeSelect();
		api.getGenres({}, (result) => {
			const genres = JSON.parse(result);
			const genresSortedByCount = genres.results.sort((a, b) => (a.count < b.count));
			const genresCulled = genresSortedByCount.filter(a => a.count !== 0);
			this.setState({
				genres: genresCulled || []
			});
		});
	}

	onBrowseSelect() {
		this.props.onBrowseSelect();
	}

	render() {
		return (
			<div className="home">
				<BookListing key="top-sellers" genre={{name: 'Top Sellers'}} onBrowseSelect={this.onBrowseSelect} />
				<BookListing key="top-rated" genre={{name: 'Top Rated'}} onBrowseSelect={this.onBrowseSelect} />
				{this.state.genres.map(genre => <BookListing key={genre._id} genre={genre} onBrowseSelect={this.onBrowseSelect} />)}
			</div>
		);
	}
}

export default Home;
