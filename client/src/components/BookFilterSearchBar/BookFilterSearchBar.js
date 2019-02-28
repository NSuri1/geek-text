import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookFilterSearchBar.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

class BookFilterSearchBar extends Component {
	constructor(props) {
		super(props);
	}

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
