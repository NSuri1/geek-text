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
				<div className="toggle-label">
					<h5>{this.props.category}</h5>
					<h5 className="category-count">200</h5>
				</div>
			</div>
		);
	}
}

BookFilter.propTypes = {
	book: PropTypes.object
};

export default BookFilter;
