import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalImage from 'react-modal-image';
import './BookImage.css';

class BookImage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="imgContainer">
				<ModalImage
					small={this.props.bookCover !== '' ? `data:image/jpeg;base64,${this.props.bookCover}` : 'book-placeholder.jpg'}
					large={this.props.bookCover !== '' ? `data:image/jpeg;base64,${this.props.bookCover}` : 'book-placeholder.jpg'}
					alt={this.props.bookTitle}
				/>
				{/* <img className="imageCover" src={this.props.bookCover !== '' ? `data:image/jpeg;base64,${this.props.bookCover}` : 'book-placeholder.jpg'} alt="Book Cover" onClick={() => () => this.setprops({ open: true })} /> */}
			</div>
		);
	}
}

BookImage.propTypes = {
	bookCover: PropTypes.string,
	bookTitle: PropTypes.string,
};

export default BookImage;
