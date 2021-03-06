import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookSorterDropdown.css';

class BookSorterDropdown extends Component {
	constructor(props) {
		super(props);
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.selectSortOption = this.selectSortOption.bind(this);
		this.state = { toggled: false,
									 sortOptions: {"Title": "asc", "Author": "asc",
									 							 "Price": "asc", "Rating": "asc"},
									 currentOption: "Title"}
	}

	componentDidMount() {

	}

	toggleDropdown() {
		this.setState(prevState => ({
			toggled: !prevState.toggled
		}));
	}

	selectSortOption(ev, option) {
		this.setState(prevState => {
			let newState = prevState;
			if (option === prevState.currentOption) {
				newState.sortOptions = Object.assign({}, prevState.sortOptions, {[option]: prevState.sortOptions[option] === "asc" ? "desc" : "asc" })
			} else {
				newState.currentOption = option
			}
			if (this.props.onSortSelected) this.props.onSortSelected(option, newState.sortOptions[option]);
			return newState;
		});

		ev.stopPropagation();
	}

	render() {
		var contentClass = `dropdown-content${this.state.toggled ? ' expanded' : ''}`;
		return (
			<div className="dropdown-toggle" onClick={this.toggleDropdown}>
			  <p>Sort by:</p>
			  <p className="selected-sort-option">{this.state.currentOption}</p>
			  <img alt={this.state.sortOptions[this.state.currentOption] === "asc" ? "Up Arrow" : "Down Arrow"} className="sort-order-image" src={this.state.sortOptions[this.state.currentOption] === "asc" ? "up-arrow.png" : "down-arrow.png"}/>

			  <div className={contentClass}>
					{["Author", "Title", "Price", "Rating"].map(option =>
						<div key={option} className="sort-option" onClick={(ev) => this.selectSortOption(ev, option)}>
							<p>{option}</p><p>({this.state.sortOptions[option]})</p>
						</div>
					)}
			  </div>
			</div>
		);
	}
}

BookSorterDropdown.propTypes = {
	book: PropTypes.object
};

export default BookSorterDropdown;
