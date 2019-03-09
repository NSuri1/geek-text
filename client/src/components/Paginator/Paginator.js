import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Paginator.css';

class Paginator extends Component {
	constructor(props) {
		super(props)
		this._pages = props.numPages && props.numPages > 0 ? [...Array(props.numPages).keys()] : [0];
		this._perPageOptions = [10, 20];
		this.state = { currentPage: 0, currentSection: 0 };

		this.setSelectedPage = this.setSelectedPage.bind(this);
		this.handleFirstClicked = this.handleFirstClicked.bind(this);
		this.handlePrevClicked = this.handlePrevClicked.bind(this);
		this.handleNextClicked = this.handleNextClicked.bind(this);
		this.handleLastClicked = this.handleLastClicked.bind(this);
		this.handlePerPageClicked = this.handlePerPageClicked.bind(this);
	}

	componentWillReceiveProps(props) {
		this._pages = props.numPages && props.numPages > 0 ? [...Array(props.numPages).keys()] : [0];
		this._perPage = props.resultsPerPage;
	}

	setSelectedPage(page) {
		this.setState({
			currentPage: page
		});
		this.props.onPageSelected(page);
	}

	handleFirstClicked() {
		this.setState({
			currentPage: 0,
			currentSection: 0
		});
		this.props.onPageSelected(0);
	}

	handlePrevClicked() {
		this.setState(prevState => {
			var newPage = Math.max(0, prevState.currentPage - 1);
			this.props.onPageSelected(newPage);
			return {
				currentPage: newPage,
				currentSection: Math.floor(newPage / this.props.resultsPerPage)
			}
		});
	}

	handleNextClicked() {
		this.setState(prevState => {
			var newPage = Math.min(this._pages.length - 1, prevState.currentPage + 1);
			this.props.onPageSelected(newPage);
			return {
				currentPage: newPage,
				currentSection: Math.floor(newPage / this.props.resultsPerPage)
			}
		});
	}

	handleLastClicked() {
		this.setState({
			currentPage: this._pages.length - 1,
			currentSection: Math.floor(this._pages.length / this.props.resultsPerPage)
		});
		this.props.onPageSelected(this.props.numPages - 1);
	}

	handlePerPageClicked(perPage) {
		this.props.onPerPageClicked(perPage);
	}

	render() {
		var pages = this._pages.slice(this.state.currentSection * this._perPage, this.state.currentSection * this._perPage + this._perPage);
		return (
			<div className="paginator">
				<img className="first-button flipped" src="right-arrow-double.png" onClick={this.handleFirstClicked}/>
				<img className="previous-button flipped" src="right-arrow.png" onClick={this.handlePrevClicked}/>
				{pages.map(page => <div key={page} className={`page-link${this.state.currentPage == page ? ' selected' : ''}`} onClick={() => this.setSelectedPage(page)}><p>{page + 1}</p></div>)}
				<img className="next-button" src="right-arrow.png" onClick={this.handleNextClicked}/>
				<img className="last-button" src="right-arrow-double.png" onClick={this.handleLastClicked}/>
				<div className="per-page-toggle">
					<p>Per Page:</p>
					{this._perPageOptions.map(perPage => <div key={perPage} className={`per-page-option${this._perPage == perPage ? ' selected' : ''}`} onClick={() => this.handlePerPageClicked(perPage)}>{perPage}</div>)}
				</div>
			</div>
		);
	}
}

Paginator.propTypes = {
	book: PropTypes.object
};

export default Paginator;
