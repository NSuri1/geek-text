import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AuthorInfo.css';

class AuthorInfo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="authorDetailsContainer">
				<div className="heading">More about the author(s):</div>
				{this.props.authors.map(author => {
					let info = author.bio ? author.bio : `We currently do not have any information stored about ${author.name}.`;
					return (
						<div key={author.name}>
							<Link to={{ pathname: `/author-books/${author._id}`, state: { author } }} style={{ color: 'white' }}>
								<div className="authorBio">- {author.name}</div>
							</Link>
							<div>{info}</div>
						</div>
					);
				})}
			</div>
		);
	}
}

AuthorInfo.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.object)
};

export default AuthorInfo;
