import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookFilterSearchBar.css';

class BookFilterSearchBar extends Component {
	componentDidMount() { }

	render() {
		return (
			<input placeholder="Search" type="text" className="book-filter"/>
		);
	}
}

BookFilterSearchBar.propTypes = {
	book: PropTypes.object
};

export default BookFilterSearchBar;
