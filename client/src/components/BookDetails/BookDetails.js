import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../api/ApiProvider';
import AuthorInfo from './AuthorInfo';
import Divider from './Divider';
import BookImage from './BookImage';
import BookInfo from './BookInfo';
import './BookDetails.css';
import RatingsList from './RatingsList/RatingsList';

class BookDetails extends Component {
	constructor(props) {
		super(props);
		let { state } = props.location;
		this.state = {
			bookId: state ? state.bookId : null,
			book: state ? state.book : null,
			bookCover: state ? state.bookCover : null,
		};
	}

	componentDidMount() {
		if (!this.state.book) {
			console.log('Making network request for book info');
			this.fetchBookInformation();
		}
		this.fetchRatingInformation();
		this.fetchGenreInformation();
	}

	fetchBookInformation() {
		api.getBookById(this.state.bookId, (response) => {
			this.setState({
				book: JSON.parse(response).results,
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchBookInformation();
			}, 5000);
		});
	}

	fetchRatingInformation() {
		api.getBookRatings(this.state.bookId, (response) => {
			this.setState({
				ratings: JSON.parse(response).results,
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchReviewInformation();
			}, 5000);
		});
	}

	fetchGenreInformation() {
		api.getGenreById(this.state.book.genre, (response) => {
			this.setState({
				genre: JSON.parse(response).results,
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchGenreInformation();
			}, 5000);
		});
	}

	render() {
		const { book } = this.state;
		return (
			<div className="container">
				<div className="bookDetailsContainer">
					<BookImage bookTitle={book.title} bookCover={this.state.bookCover} />
					<BookInfo book={book} genre={this.state.genre} />
				</div>
				<Divider />
				<div className="ratingsAndAuthorContainer">
					<RatingsList reviews={this.state.ratings} />
					<AuthorInfo authors={book.authors} />
				</div>
			</div >
		);
	}
}

BookDetails.propTypes = {
	location: PropTypes.object
};

export default BookDetails;
