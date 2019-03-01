import React from 'react';
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

function AppNavBar(props) {
	const { classes } = props;
	return (
		<Router>
			<div className={classes.root}>
				<AppBar position="static" className={classes.navBar}>
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<Menu />
						</IconButton>
						<Link to={{ pathname: '/' }} className={classes.heading}>
							<Typography variant="h5" color="inherit">
								Geek Text
							</Typography>
						</Link>
						<Button href="/login" color="inherit">Log In</Button>
						<Button color="inherit">Shopping Cart</Button>
					</Toolbar>
				</AppBar>
				<Route path="/" exact component={Home} />
				<Route path="/book-details" component={BookDetails} />
				<Route path="/login" component={LoginOrRegister} />
				<Route path="/browse" component={BookBrowser} />
			</div>
		</Router>
	);
}

AppNavBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavBar);
