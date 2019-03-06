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
		this._gettersMap = {
			"Title": this.loadBooksByTitle.bind(this),
			"Genre": this.loadBooksByGenre.bind(this),
			"Author": this.loadBooksByAuthor.bind(this),
			"Price": this.loadBooksByPrice.bind(this),
			"Rating": this.loadBooksByRating.bind(this)
		}
		this.onFilterSelect = this.onFilterSelect.bind(this)
	}

	componentDidMount() {
		if (this.props.location.state.books) {
			this.setState({
				books: this.props.location.state.books
			});
		} else {
			api.getBooks(result => {
				let books = JSON.parse(result);
				this.setState({
					books: books.results || []
				});
			});
		}
	}

	loadBooksByTitle(filterObj) {
		api.getBooks({title: filterObj.map(title => title.description).join(",") }, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadBooksByGenre(filterObj) {
		api.getBooks({genre: filterObj.map(genre => genre._id).join(",") }, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadBooksByAuthor(filterObj) {
		api.getBooks({authors: filterObj.map(author => author._id).join(",") }, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadBooksByPrice(filterObj) {
		api.getBooks({price: filterObj.map(price => price.description).join(",") }, result => {

		});
	}

	loadBooksByRating(filterObj) {
		api.getBooks({rating: filterObj.map(rating => rating.description).join(",") }, result => {

		});
	}

	onFilterSelect(type, filterObj) {
		this._gettersMap[type](filterObj)
	}

	render() {
		return (
			<div className="book-browser-container">
				<div className="filters-sidebar">
					<BookFilterSearchBar />
					<div className="filters">
						<div className="inner">
							{["Title", "Genre", "Author"].map(el => {
								return <BookFilter onFilterSelect={this.onFilterSelect} key={el} category={el}/>
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
