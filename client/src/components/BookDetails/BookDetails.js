import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalImage from 'react-modal-image';
import { api } from '../../api/ApiProvider';
import './BookDetails.css';

class BookDetails extends Component {
	constructor(props) {
		super(props);
		let { state } = props.location;
		this.state = {
			bookId: state ? state.bookId : null,
			book: state ? state.book : null,
			bookCover: state ? state.bookCover : null
		};
	}

	componentDidMount() {
		if (!this.state.book) {
			console.log('Making network request for book info');
			this.fetchBookInformation();
		}
	}

	fetchBookInformation() {
		api.getBookById(this.state.bookId, (response) => {
			this.setState({
				book: JSON.parse(response).results,
			});
		}, (error) => {
			console.error(error);
			setTimeout(() => {
				console.log('Trying network request again...');
				this.fetchBookInformation();
			}, 5000);
		});
	}

	render() {
		const { book } = this.state;
		console.log(book);
		return (
			<div className="container">
				<div className="bookDetailsContainer">
					<div className="imgContainer">
						<ModalImage
							small={this.state.bookCover !== '' ? `data:image/jpeg;base64,${this.state.bookCover}` : 'book-placeholder.jpg'}
							large={this.state.bookCover !== '' ? `data:image/jpeg;base64,${this.state.bookCover}` : 'book-placeholder.jpg'}
							alt={this.state.book.title}
						/>
						{/* <img className="imageCover" src={this.state.bookCover !== '' ? `data:image/jpeg;base64,${this.state.bookCover}` : 'book-placeholder.jpg'} alt="Book Cover" onClick={() => () => this.setState({ open: true })} /> */}
					</div>
					<div className="bookInfoSubContainer">
						<div>
							<div className="title">
								{book.title}
							</div>
						</div>
						<div>
							<div className="heading">
								Author(s):
							</div>
							<div>
								{book.authors.reduce((acc, val) => acc + (acc ? ', ' : '') + val.name, '')}
							</div>
						</div>
						<div>
							<div className="heading">
								Ratings & Reviews:
							</div>
							<div>
								{book.rating / 2}/5.0
							</div>
						</div>
						<div>
							<div className="heading">
								Description:
							</div>
							<div>
								{book.description}
							</div>
						</div>
						<div>
							<div className="heading">
								Publishing Info:
							</div>
							<div>
								Published {new Date(book.published_on).toLocaleDateString()} by {book.publisher}
							</div>
						</div>
						<div>
							<div className="heading">
								Other Info:
							</div>
							<div>
								ISBN: {book.isbn13}
							</div>
						</div>
					</div>
				</div>
				<div className="authorDetailsContainer">
					<div className="heading">More about the author(s):</div>
					{book.authors.map(author => {
						let info = author.bio ? author.bio : `We currently do not have any information stored about ${author.name}.`;
						return (
							<div key={author.name}>
								<div>{author.name}</div>
								<div>{info}</div>
							</div>
						);
					})}
				</div>
			</div >
		);
	}
}

BookDetails.propTypes = {
	location: PropTypes.object
};

export default BookDetails;
