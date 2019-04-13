import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';

class App extends Component {

	render() {
		return (
			<div className="app">
				<NavBar toggleLogIn={this.toggleLogIn}/>
			</div>
		);
	}
}

export default App;
