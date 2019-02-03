import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../Home'

const styles = {
  root: {
    flexGrow: 1
  },
  heading: {
    flexGrow: 1
  },
  navBar: {
    backgroundColor: "brown",
    color: "white"
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" className={classes.heading}>
              Geek Text Home
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Route path="/" exact component={Home} />
      </div>
    </Router >
  );
}

AppNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavBar);
