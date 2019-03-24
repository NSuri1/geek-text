import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './BookListing.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

import BookCard from '../BookCard';

class BookListing extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [] };
		this.onBrowseSelect = this.onBrowseSelect.bind(this);
	}

	componentDidMount() {
		if (this.props.genre.name === 'Top Sellers') {
			this.loadTopSellers();
		} else if (this.props.genre.name === 'Top Rated') {
			this.loadTopRated();
		} else {
			this.loadGenreBooks();
		}
	}

	loadTopSellers() {
		api.getTopSellers({ limit: 15 }, (result) => {
			console.log(result)
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadTopRated() {
		api.getTopRated({ limit: 15 }, (result) => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadGenreBooks() {
		api.getBooks({ genre: this.props.genre._id, limit: 15 }, (result) => {
			const books = JSON.parse(result);
			this.setState({
				books: books.results || [],
			});
		});
	}

	onBrowseSelect() {
		this.props.onBrowseSelect();
	}

	render() {
		return (
			<div className="listing-container-outer">
				<Typography variant="h5" color="inherit" className="listing-header">
					{this.props.genre.name}
					<Link onClick={this.onBrowseSelect} to={{ pathname: `/browse`, state: { books: this.state.books } }}>
						<h6 className="book-title">Show All</h6>
					</Link>
				</Typography>
				<div className="listing-container-inner">
					{this.state.books.map(book => <BookCard key={book._id} book={book} />)}
				</div>
				<div className="listing-container-blur"></div>
			</div>
		);
	}
}

BookListing.propTypes = {
	genre: PropTypes.object.isRequired
};

export default BookListing;
