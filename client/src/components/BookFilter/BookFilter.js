import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';
import { Link } from 'react-router-dom';
import { api } from '../../api/ApiProvider';

class BookFilter extends Component {
	constructor(props) {
		super(props);
		this.state = { filterData: [], toggled: false }
		this.toggleFilter = this.toggleFilter.bind(this);
	}

	componentDidMount() {
		if (this.props.category) {
			let filterFunction = api.filterGetters()[this.props.category].bind(api);
			filterFunction(result => {
				var data = JSON.parse(result);
				data = data.results.map(obj => obj.name ? obj.name :
																								 (obj.title ? obj.title : null))
														.filter(e => e != null);
				this.setState({
					filterData: data || []
				});
			});
		}
	}

	toggleFilter() {
		this.setState(prevState => ({
			toggled: !prevState.toggled
		}));
	}

	render() {
		var contentClass = `toggle-contents ${this.state.toggled ? 'expanded' : ''}`;
		var contents = this.state.filterData.map(datum => <div class="datum">{datum}</div>);
		return (
			<div className="book-filter">
				<div className="toggle-label" onClick={this.toggleFilter}>
					<h5>{this.props.category}</h5>
					<h5 className="category-count">{this.state.filterData.length}</h5>
				</div>
				<div className={contentClass}>
					{contents}
				</div>
			</div>
		);
	}
}

BookFilter.propTypes = {
	book: PropTypes.object
};

export default BookFilter;
