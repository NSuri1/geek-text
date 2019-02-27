import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookBrowser.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

import BookFilter from '../BookFilter'

class BookBrowser extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() { }

	render() {
		return (
			<div className="book-browser-container">
				<div className="filters-sidebar">
					{["Title", "Genre", "Author", "Price", "Rating"].map(el => {
						return <BookFilter category={el}/>
					})}
				</div>
			</div>
		);
	}
}

BookBrowser.propTypes = {
	book: PropTypes.object
};

export default BookBrowser;
