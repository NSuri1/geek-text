import React, { Component } from 'react';
import './App.css';
import Router from './components/Router';
import CustomAppBar from './CustomAppBar';

class App extends Component {
  render() {
    return (
      <div className="app">
      <CustomAppBar></CustomAppBar>
        <Router />
      </div>
    );
  }
}

export default App;
