import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookBrowser.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

import BookCard from '../BookCard';
import BookFilter from '../BookFilter'
import BookFilterSearchBar from '../BookFilterSearchBar'

class BookBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [] };
	}

	componentDidMount() {
		if (this.props.location.state.books) {
			this.setState({
				books: this.props.location.state.books
			});
		} else {
			this.loadTopRated();
		}
	}

	loadTopRated() {
		api.getTopRated({}, (result) => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	render() {
		var books = this.state.books;
		return (
			<div className="book-browser-container">
				<div className="filters-sidebar">
					<BookFilterSearchBar />
					<div className="filters">
						<div className="inner">
							{["Title", "Genre", "Author", "Price", "Rating"].map(el => {
								return <BookFilter key={el} category={el}/>
							})}
						</div>
					</div>
				</div>
				<div className="book-collection">
					{this.state.books.map(book => <BookCard key={book._id} book={book} collectionCard={true} />)}
				</div>
			</div>
		);
	}
}

BookBrowser.propTypes = {
	book: PropTypes.object
};

export default BookBrowser;