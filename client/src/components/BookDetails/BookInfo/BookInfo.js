import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
				{this.buildKeyValueDiv('Author(s)', book.authors.reduce((acc, val) => acc + (acc ? ', ' : '') + val.name, ''))}
				{this.buildKeyValueDiv('Ratings', `${book.rating / 2}/5.0`)}
				{this.buildKeyValueDiv('Description', book.description)}
				{this.buildKeyValueDiv('Publishing Info', `Published ${new Date(book.published_on).toLocaleDateString()} by ${book.publisher}`)}
				{this.buildKeyValueDiv('Other Info', `ISBN: ${book.isbn13}`)}
			</div>
		);
	}
}

BookInfo.propTypes = {
	book: PropTypes.object,
};

export default BookInfo;
