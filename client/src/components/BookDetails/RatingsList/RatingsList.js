import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RatingsList.css';

class RatingsList extends Component {
	constructor(props) {
		super(props);
	}

	buildRatingComponent(heading, value) {
		return (
			<div>
				<div className="heading">
					{heading}:
				</div>
				<div>
					{value}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="ratingsListContainer">
				<div className="heading">Book Ratings and Reviews:</div>
				{this.props.reviews && this.props.reviews.map(review => {
					return (
						<div className="review" key={review._id}>
							{review.comment}
						</div>
					);
				})}

				{(!this.props.reviews || this.props.reviews.length === 0) && <div>No reviews for this book just yet</div>}
			</div>
		);
	}
}

RatingsList.propTypes = {
	reviews: PropTypes.arrayOf(PropTypes.object),
};

export default RatingsList;
