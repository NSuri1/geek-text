import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { api } from '../../../api/ApiProvider'

class CredentialsDialog extends Component{

    constructor(props) {
		super(props);
        this.state = {
            username: "",
            password: "",
        }
        
        this.editUser = this.editUser.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    editUser() {
        let form = this.state

        if(form.username === "" && form.password === "") {return}
        if(form.username === "") {delete form.username};;
        if(form.password === "") {delete form.password};;

        api.updateUser(this.props.user._id, form, (result) => {
            let data = JSON.parse(result);
            console.log(data) 
            
            this.setState({
                username: "",
                password: ""
            })

            if(data.success === true) {
                this.props.update()
                this.props.close()
            }
        })
          
    }

    handleInput = (e) =>{
        const value = e.target.value
        const name = e.target.name
    
        this.setState({
          [name]: value 
        })

        console.log(this.state)
    }  
    
    
    render() {

        const {user, open, close} = this.props

        return(
            <Dialog
            open={open}
            >
                <DialogTitle id="form-dialog-title">Edit Login Credentials</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit any of the following fields, make your changes and click submit.
                    </DialogContentText>
                    <br></br>
                    Username:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="username"
                        placeholder={user.username}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Password:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="password"
                        placeholder="*********"
                        onChange={this.handleInput}
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.editUser} color="primary">Submit</Button>
                    <Button onClick={close} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default CredentialsDialog