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

	onCardHover(event) {
		this.setState(prevState => ({
			hasMouse: !prevState.hasMouse
		}));
	}

	render() {
		const cardClass = `book-card ${this.state.hasMouse ? 'hovered' : ''}`
		return (
			<div className={cardClass} onMouseEnter={this.onCardHover} onMouseLeave={this.onCardHover}>
				<Link to={{
					pathname: '/book-details',
					state: { bookId: this.props.book._id }
				}}>
					<img
						className="cover-image"
						src={this.state.coverImage !== '' ? 'data:image/jpeg;base64,' + this.state.coverImage : ''}
						alt="Book Cover"
					/>
				</Link>
				<div className="book-info">
					<h5 className="title">{this.props.book.title}</h5>
					{/*<h6 className="author">{`by ` + this.props.book.authors.join(', ')}</h6>*/}
					<div className="rating"></div>
					<h4 className="price">{`$` + this.props.book.price.toFixed(2)}</h4>
				</div>
			</div>

		);
	}
}

BookCard.propTypes = {
	book: PropTypes.object
};

export default BookCard;
