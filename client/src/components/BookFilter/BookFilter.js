import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

class BookFilter extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() { }

	render() {
		return (
			<div className="book-filter">
				<h5 className="toggle-label">
					{this.props.category}
				</h5>
			</div>
		);
	}
}

BookFilter.propTypes = {
	book: PropTypes.object
};

export default BookFilter;
