import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoginBox.css';
import { api } from '../../api/ApiProvider';

class LoginBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      server: {}
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleInput = (e) =>{
    const value = e.target.value
    const name = e.target.name

    this.setState({
      [name]: value 
    })
  }

  submitLogin = async (e) =>{
    e.preventDefault()

    api.logIn(this.state, (result) => {
      let response = JSON.parse(result);
      console.log(result)

      this.setState(
        {
          submitted: true, 
          server: response
        }
      )

      if(response.success) {

        localStorage.setItem('token', response.token)
        this.props.update()
        this.context.router.history.push("/") 
      }
    });
  }

  inputError = (error) => {
    return (
      <div className="logIn-input-message">
          {error}
        </div>
    )
  };
  
  render() {
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

          <form onSubmit={this.submitLogin.bind(this)}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={this.handleInput}
                value={this.state.username}
                type="text"
                name="username"
                className="login-input"
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
                className="login-input"
                placeholder="Password"/>
              {this.state.server.hasOwnProperty("password") && this.inputError(this.state.server.password)}  
            </div>

            <button
              className="login-btn"
              type="submit">
                Login
            </button>

          </form>
      </div>
    </div>  
    );
  }

}

export default LoginBox;
