import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './LoginOrRegister.css';
import LoginBox from '../LoginBox';
import RegisterBox from '../RegisterBox';


class LoginOrRegister extends Component {

	constructor(props) {
	    super(props);
		this.state = {
		  isLoginOpen: true,
		  isRegisterOpen: false
		};
    }
      
    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }
    
    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

	render(){
		return (
			<div className="root-container">
				<div className="tab-controller">
					<div
						className={'controller ' + (this.state.isLoginOpen ? 'selected-controller' : '')}
						onClick={this.showLoginBox.bind(this)}  
					>
						<Typography variant="h5" color="inherit">
					    Login
				    </Typography>                       
					</div>
					<div
						className={'controller ' + (this.state.isRegisterOpen ? 'selected-controller' : '')}
						onClick={this.showRegisterBox.bind(this)}
					>
						<Typography variant="h5" color="inherit">
					    Register
				    </Typography> 
					</div>
				</div>            
				<div className="form-container">
					{this.state.isLoginOpen && <LoginBox/>}
					{this.state.isRegisterOpen && <RegisterBox/>}
				</div>                
			</div>
		);
	}
}

export default LoginOrRegister;