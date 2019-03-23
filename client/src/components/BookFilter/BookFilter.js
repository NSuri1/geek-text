import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';
import { api } from '../../api/ApiProvider';

class BookFilter extends Component {
	constructor(props) {
		super(props);
		this.state = { filterData: [], toggled: false };
		this._selectedFilters = [];
		this.toggleFilter = this.toggleFilter.bind(this);
		this.toggleFilterSelect = this.toggleFilterSelect.bind(this);
	}

	componentDidMount() {
		if (this.props.category) {
			let filterFunction = api.filterGetters()[this.props.category].bind(api);
			filterFunction(result => {
				var data = JSON.parse(result);
				if (data.results) {
					data = data.results.map(obj => ({_id: obj._id || "0", description: obj.name ? obj.name :
																																	  (obj.title ? obj.title : null)})
																 ).filter(e => e != null);
					this.setState({
						filterData: data || []
					});
				}
			});
		}
	}

	toggleFilter() {
		this.setState(prevState => ({
			toggled: !prevState.toggled
		}));
	}

	toggleFilterSelect(type, filterObj) {
		if (!this._selectedFilters.includes(filterObj)) {
			this._selectedFilters.push(filterObj);
		} else {
			let filterObjIndex = this._selectedFilters.indexOf(filterObj);
			this._selectedFilters.splice(filterObjIndex, 1);
		}

		if (this.props.onFilterSelect)
			this.props.onFilterSelect(type, this._selectedFilters);
	}

	render() {
		var contentClass = `toggle-contents ${this.state.toggled ? 'expanded' : ''}`;

		var contents = this.state.filterData.map(datum => {
			var filterClass = `datum ${this._selectedFilters.includes(datum) ? 'selected' : ''}`;
			return <div onClick={() => this.toggleFilterSelect(this.props.category, datum)} className={filterClass} key={datum.description}>{datum.description}</div>
		});

		return (
			<div className="book-filter">
				<div className="toggle-label" onClick={this.toggleFilter}>
					<h5>{this.props.category}</h5>
					<h5 className="category-count">{this.state.filterData.length}</h5>
				</div>
				<div className={contentClass}>
					<div className="inner">
						{contents}
					</div>
				</div>
			</div>
		);
	}
}

BookFilter.propTypes = {
	book: PropTypes.object
};

export default BookFilter;
