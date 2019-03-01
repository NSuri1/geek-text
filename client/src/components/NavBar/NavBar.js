import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Home from '../Home';
import BookDetails from '../BookDetails';
import LoginOrRegister from '../LoginOrRegister';
import BookBrowser from '../BookBrowser';

const styles = {
	root: {
		flexGrow: 1,
		height: "100%"
	},
	heading: {
		flexGrow: 1,
		color: 'white',
		textDecoration: 'none'
	},
	navBar: {
		backgroundColor: 'brown',
		color: 'white',
		position: 'fixed'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class AppNavBar extends Component {
	constructor(props) {
		super(props);
		this.onBrowseSelect = this.onBrowseSelect.bind(this);
		this.onHomeSelect = this.onHomeSelect.bind(this);
		this.state = { title: "Geek Text" }
	}

	onBrowseSelect() {
		this.setState({
			title: "Browse"
		})
	}

	onHomeSelect() {
		if (this.state.title != "Geek Text") {
			this.setState({
				title: "Geek Text"
			})
		}
	}

	render() {
		return (
			<Router>
				<div className={this.props.classes.root}>
					<AppBar position="static" className={this.props.classes.navBar}>
						<Toolbar>
							<IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
								<Menu />
							</IconButton>
							<Link to={{ pathname: '/' }} className={this.props.classes.heading}>
								<Typography variant="h5" color="inherit">
									{this.state.title}
								</Typography>
							</Link>
							<Button href="/login" color="inherit">Log In</Button>
							<Button color="inherit">Shopping Cart</Button>
						</Toolbar>
					</AppBar>
					<Route path="/" exact component={() => <Home onBrowseSelect={this.onBrowseSelect} onHomeSelect={this.onHomeSelect}/>} />
					<Route path="/book-details" component={BookDetails} />
					<Route path="/login" component={LoginOrRegister} />
					<Route path="/browse" component={BookBrowser} />
				</div>
			</Router>
		);
	}
}

AppNavBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavBar);
