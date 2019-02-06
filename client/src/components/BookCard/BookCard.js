import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookCard.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

class BookCard extends Component {
	constructor(props) {
		super(props);
		this.state = { coverImage: '' };
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

	render() {
		return (
			<div className="book-card">
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
			</div>

		);
	}
}

BookCard.propTypes = {
	book: PropTypes.object
};

export default BookCard;
