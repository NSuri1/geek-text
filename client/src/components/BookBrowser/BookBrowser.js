import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookBrowser.css';
import { api } from '../../api/ApiProvider';

import BookCard from '../BookCard';
import BookFilter from '../BookFilter';
import BookFilterSearchBar from '../BookFilterSearchBar';
import BookSorterDropdown from '../BookSorterDropdown';
import Paginator from '../Paginator';

class BookBrowser extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [], sort: { field: "Title", order: 1 }, booksPerPage: 10, currentPage: 0 };
		this._gettersMap = {
			"Title": this.loadBooksByTitle.bind(this),
			"Genre": this.loadBooksByGenre.bind(this),
			"Author": this.loadBooksByAuthor.bind(this),
			"Price": this.loadBooksByPrice.bind(this),
			"Rating": this.loadBooksByRating.bind(this)
		}
		this.onFilterSelect = this.onFilterSelect.bind(this)
		this.onSortSelected = this.onSortSelected.bind(this)
		this.onPageSelected = this.onPageSelected.bind(this)
		this.onPerPageClicked = this.onPerPageClicked.bind(this)
	}

	componentDidMount() {
		if (this.props.location.state.books) {
			this.setState({
				books: this.props.location.state.books
			});
		} else {
			api.getBooks(result => {
				let books = JSON.parse(result);
				this.setState({
					books: books.results || []
				});
			});
		}
	}

	loadBooksByTitle(filterObj) {
		api.getBooks({title: filterObj.map(title => title.description).join(",")}, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadBooksByGenre(filterObj) {
		api.getBooks({genre: filterObj.map(genre => genre._id).join(",")}, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	loadBooksByAuthor(filterObj) {
		api.getBooks({authors: filterObj.map(author => author._id).join(",")}, result => {
			var books = JSON.parse(result);
			this.setState({
				books: books.results || []
			});
		});
	}

	// TODO: Might be useful later, but otherwise remove
	loadBooksByPrice(filterObj) {
		api.getBooks({price: filterObj.map(price => price.description).join(",")}, result => {

		});
	}

	// TODO: Might be useful later, but otherwise remove
	loadBooksByRating(filterObj) {
		api.getBooks({rating: filterObj.map(rating => rating.description).join(",")}, result => {

		});
	}

	onFilterSelect(type, filterObj) {
		this._gettersMap[type](filterObj)
	}

	onSortSelected(field, order) {
		this.setState({
			sort: { field: field, order: order === "asc" ? 1 : -1 }
		});
	}

	onPageSelected(page) {
		this.setState({
			currentPage: page
		})
	}

	onPerPageClicked(perPage) {
		this.setState({
			booksPerPage: perPage
		})
	}

	render() {
		var books = this.state.books.slice();
		books.sort((a, b) => {
			if (this.state.sort.order === 1) {
				if (this.state.sort.field === "Genre") {
					return a.genre.name > b.genre.name
				} else if (this.state.sort.field === "Author") {
					return a.authors[0].name > b.authors[0].name
			 	} else {
					return a[this.state.sort.field.toLowerCase()] > b[this.state.sort.field.toLowerCase()]
				}
			} else {
				if (this.state.sort.field === "Genre") {
					return a.genre.name < b.genre.name
				} else if (this.state.sort.field === "Author") {
					return a.authors[0].name < b.authors[0].name
			 	} else {
					return a[this.state.sort.field.toLowerCase()] < b[this.state.sort.field.toLowerCase()]
				}
			}
		});
		books = books.slice(this.state.currentPage * this.state.booksPerPage, this.state.currentPage * this.state.booksPerPage + this.state.booksPerPage);

		return (
			<div className="book-browser-container">
				<div className="filters-sidebar">
					<BookFilterSearchBar />
					<div className="filters">
						<div className="inner">
							{["Title", "Genre", "Author"].map(el => {
								return <BookFilter onFilterSelect={this.onFilterSelect} key={el} category={el}/>
							})}
						</div>
					</div>
				</div>
				<div className="book-collection-container">
					<div className="book-collection">
						{books.map(book => <BookCard key={book._id} book={book} collectionCard={true} />)}
					</div>
					<BookSorterDropdown className="book-sorter" onSortSelected={this.onSortSelected}/>
					<Paginator numPages={Math.floor(this.state.books.length / this.state.booksPerPage) + 1}
										 resultsPerPage={this.state.booksPerPage}
										 onPageSelected={this.onPageSelected}
										 onPerPageClicked={this.onPerPageClicked}/>
				</div>
			</div>
		);
	}
}

BookBrowser.propTypes = {
	book: PropTypes.object
};

export default BookBrowser;
