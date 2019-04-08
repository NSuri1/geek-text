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
			this.setState(
				{ bookId: this.props.match.params.bookId },
				() => this.fetchBookInformation()
			);
			console.log('Making network request for book info');
		} else {
			this.fetchRatingInformation();
			this.fetchGenreInformation();
		}

	}

	fetchBookInformation() {
		api.getBookById(this.state.bookId, (response) => {
			this.setState({
				book: JSON.parse(response).results,
			}, () => {
				console.log(this.state.book);
				// The lines below don't have to be here once we use async/await
				this.fetchBookCover();
				this.fetchRatingInformation();
				this.fetchGenreInformation();
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchBookInformation();
			}, 5000);
		});
	}

	fetchBookCover() {
		api.getMedia({ id: this.state.book.cover_image }, (result) => {
			let media = JSON.parse(result);
			media = media.results;
			this.setState({
				bookCover: media.base64 || []
			});
		}, error => console.error(error));
	}

	fetchRatingInformation() {
		api.getBookRatings(this.state.bookId, (response) => {
			let ratings = JSON.parse(response).results;
			ratings.map(rating => {
				let userId = rating.user;
				api.getUserById(userId, username => {
					rating.username = JSON.parse(username).results.username;
					// Todo: Fix this... use async/await. Don't call set state so many times
					this.setState({ ratings });
				}, error => {
					console.error(error);
				});
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
		if (!book) {
			return (
				<div className="container">Loading...</div>
			);
		}
		return (
			<div className="container">
				<div className="bookDetailsContainer">
					<BookImage bookTitle={book.title} bookCover={this.state.bookCover} />
					<BookInfo book={book} genre={this.state.genre} />
				</div>
				<Divider />
				<div className="ratingsAndAuthorContainer">
					<AuthorInfo authors={book.authors} />
					<RatingsList reviews={this.state.ratings} />
				</div>
			</div >
		);
	}
}

BookDetails.propTypes = {
	location: PropTypes.object,
	match: PropTypes.object,
};

export default BookDetails;
