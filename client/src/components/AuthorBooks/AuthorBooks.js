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
		} else {
			this.setState(
				{ authorId: this.props.match.params.authorId },
				() => this.fetchAuthorInformation()
			);
		}
	}

	fetchAuthorInformation() {
		api.getAuthorById(this.state.authorId, (response) => {
			this.setState(
				{ author: JSON.parse(response).results },
				() => this.state.author.books.map(bookId => this.fetchBookInformation(bookId))
			);
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchAuthorInformation();
			}, 5000);
		});
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
		if (!author) {
			return (
				<div className="authorBooksContainer">
					Loading...
				</div>
			);
		}
		return (
			<div className="authorBooksContainer">
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
	location: PropTypes.object,
	match: PropTypes.object
};

export default AuthorBooks;
