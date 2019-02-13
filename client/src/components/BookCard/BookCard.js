import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

class BookCard extends Component {
	constructor(props) {
		super(props);
		this.state = { coverImage: '', hasMouse: false };
		this.onCardHover = this.onCardHover.bind(this);
	}

	componentDidMount() {
		api.getMedia({ id: this.props.book.cover_image }, (result) => {
			let media = JSON.parse(result);
			media = media.results;
			this.setState({
				coverImage: media.base64 || []
			});
		});
	}

	onCardHover() {
		this.setState(prevState => ({
			hasMouse: !prevState.hasMouse
		}));
	}

	render() {
		const roundedRating = Math.floor(this.props.book.rating);
		const ratingImages = [];
		for (let i = 0; i < roundedRating; i++) {
			if (i % 2 == 0) {
				ratingImages.push(<img className="rating-half-star" src="/star_left.png"/>);
			} else {
				ratingImages.push(<img className="rating-half-star" src="/star_right.png"/>);
			}
		}

		const cardClass = `book-card ${this.state.hasMouse ? 'hovered' : ''}`;
		return (
			<div className={cardClass} onMouseEnter={this.onCardHover} onMouseLeave={this.onCardHover}>
				<Link to={{ pathname: '/book-details', state: { bookId: this.props.book._id, book: this.props.book, bookCover: this.state.coverImage } }}>
					<img className="cover-image" src={this.state.coverImage !== '' ? 'data:image/jpeg;base64,' + this.state.coverImage : 'book-placeholder.jpg'} alt="Book Cover" />
					{/*Use this to test the placeholder image, or delete if desired
						<img className="cover-image" src={'book-placeholder.jpg'} alt="Book Cover"/>*/}
				</Link>
				<div className="book-info">
					<Link to={{ pathname: '/book-details', state: { bookId: this.props.book._id, book: this.props.book, bookCover: this.state.coverImage } }}>
						<h5 className="book-title">{this.props.book.title}</h5>
					</Link>
					<Link to={{ pathname: '/', state: { bookId: this.props.book._id } }}>
						<h6 className="author">{'by ' + this.props.book.authors.reduce((acc, val) => acc + (acc ? ', ' : '') + val.name, '')}
						</h6>
					</Link>
					<div className="rating">
					{ratingImages}
					</div>
					<h4 className="price">{'$' + this.props.book.price.toFixed(2)}</h4>
				</div>
			</div>

		);
	}
}

BookCard.propTypes = {
	book: PropTypes.object
};

export default BookCard;
