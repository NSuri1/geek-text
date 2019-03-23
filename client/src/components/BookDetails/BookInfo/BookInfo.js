import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BookInfo.css';

class BookInfo extends Component {
	constructor(props) {
		super(props);
	}

	buildKeyValueDiv(heading, value) {
		return (
			<div>
				<div className="heading">
					{heading}:
				</div>
				<div>
					{value}
				</div>
			</div>
		);
	}

	render() {
		const { book } = this.props;
		return (
			<div className="bookInfoSubContainer">
				<div>
					<div className="title">
						{book.title}
					</div>
				</div>
				<div className="heading">
					Author(s):
				</div>
				<div>
					{book.authors.map((author, index) => {
						let viewString;
						if (index < book.authors.length - 1) {
							viewString = `${author.name}, `;
						} else {
							viewString = author.name;
						}
						return (
							<Link to={{ pathname: '/author-books', state: { author } }} style={{ color: 'white' }} key={author.name}>
								{viewString}
							</Link>
						);

					})}
				</div>
				{this.buildKeyValueDiv('Ratings', `${book.rating / 2}/5.0`)}
				{this.buildKeyValueDiv('Description', book.description)}
				{this.buildKeyValueDiv('Publishing Info', `Published ${new Date(book.published_on).toLocaleDateString()} by ${book.publisher}`)}
				{this.buildKeyValueDiv('Other Info', `ISBN: ${book.isbn13}`)}
			</div >
		);
	}
}

BookInfo.propTypes = {
	book: PropTypes.object,
};

export default BookInfo;
