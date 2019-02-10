import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './BookListing.css';

import BookCard from '../BookCard';
import { api } from '../../api/ApiProvider';

class BookListing extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [] };
	}

	componentDidMount() {
		api.getBooks({ genre: this.props.genre._id }, (result) => {
			const books = JSON.parse(result);
			this.setState({
				books: books.results || [],
			});
		});
	}

	render() {
		return (
			<div className="listing-container-outer">
				<Typography variant="h5" color="inherit" className="listing-header">
					{this.props.genre.name}
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
