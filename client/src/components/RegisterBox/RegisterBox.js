import React, { Component, Fragment } from 'react';
import './RegisterBox.css';
import { api } from '../../api/ApiProvider';


class RegisterBox extends Component {

  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        submitted: false,
        server: {}
      };
  }
  
  handleInput = (e) =>{
    const value = e.target.value
    const name = e.target.name

    this.setState({
      [name]: value 
    })
  }

  submitRegister = (e) =>{
    e.preventDefault()

    api.createUser(this.state, (result) => {
      let response = JSON.parse(result);
      console.log(result)
      this.setState(
        {
          submitted: true, 
          server: response
        })
    });  
  }

  registerMessage = () => {
    if(this.state.server.success) {
      return (
        <div className="created-message">
          Account Succesfully Created!
        </div>
      )
    }
  };

  passwordValidation = (password) => {
    return (password.map((error, i) => <Fragment key={i} >{this.inputError(error)}</Fragment>))  
    
  };

  inputError = (error) => {
    return (
      <div className="register-input-message">
          {error}
      </div>
    )
  };


  render() {
    return (
      <div className="inner-container">

        <div className="header">
          Register
        </div>

        <div className="box">
          <form onSubmit={this.submitRegister.bind(this)}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={this.handleInput}
                value={this.state.username}
                type="text"
                name="username"
                className="register-input"
                placeholder="Username"/>
               {this.state.server.hasOwnProperty("username") && this.inputError(this.state.server.username)} 
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleInput}
                value={this.state.password}
                type="password"
                name="password"
                className="register-input"
                placeholder="Password"/>
              {this.state.server.hasOwnProperty("password") && this.passwordValidation(this.state.server.password)} 
            </div>

            <div className="input-group">
              <label htmlFor="first_name">First Name</label>
              <input
                onChange={this.handleInput}
                value={this.state.first_name}
                type="text"
                name="first_name"
                className="register-input"
                placeholder="First Name"/>
              {this.state.server.hasOwnProperty("first_name") && this.inputError(this.state.server.first_name)}  
            </div>

            <div className="input-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                onChange={this.handleInput}
                value={this.state.last_name}
                type="text"
                name="last_name"
                className="register-input"
                placeholder="Last Name"/>
              {this.state.server.hasOwnProperty("last_name") && this.inputError(this.state.server.last_name)}  
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleInput}
                value={this.state.email}
                type="text"
                name="email"
                className="register-input"
                placeholder="Email"/>
              {this.state.server.hasOwnProperty("email") && this.inputError(this.state.server.email)}  
            </div>

      
            <button
              className="register-btn"
              type="submit">
                Register
            </button>

            {this.state.submitted && this.registerMessage()}


          </form>
        </div>
      </div>

    );
  }
}

export default RegisterBox;