import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookCard from '../BookCard';
import './AuthorBooks.css';

import { api } from '../../api/ApiProvider';

class AuthorBooks extends Component {
	constructor(props) {
		super(props);
		let { state } = props.location;
		this.state = {
			author: state ? state.author : null,
			books: []
		};
	}

	componentDidMount() {
		if (this.state.author) {
			console.log('Making network request for books written by author');
			this.state.author.books.map(bookId => this.fetchBookInformation(bookId));
		}
	}

	fetchBookInformation(bookId) {
		api.getBookById(bookId, (response) => {
			this.setState({
				book: this.state.books.push(JSON.parse(response).results),
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchBookInformation(bookId);
			}, 5000);
		});
	}

	render() {
		let { author, books } = this.state;
		console.log(this.state);
		if (!author) {
			return (
				<div className="container">
					We are sorry, an error occurred, please try again.
				</div>
			);
		}
		return (
			<div className="container">
				<div className="heading">
					These are all the books written by {author.name}:
				</div>
				<div className="booksSection">
					{books.map(book => <BookCard key={book._id} book={book} />)}
				</div>
			</div >
		);
	}
}

AuthorBooks.propTypes = {
	location: PropTypes.object
};

export default AuthorBooks;
