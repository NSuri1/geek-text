import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddressesDialog from './AddressesDialog'
import { api } from '../../../api/ApiProvider'

class PersonalDialog extends Component{

    constructor(props) {
		super(props);
        this.state = {
            first_name: "",
            last_name: "",
            nickname: "",
            email: "",
            addressesDialog: false,
        }
        
        this.editUser = this.editUser.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.toggleAddressesDialog = this.toggleAddressesDialog.bind(this);
    }
    
    editUser() {
        let form = this.state

        delete form.addressesDialog
        if(form.first_name === "" && form.last_name === "" && form.nickname === "" && form.email === "") {return}
        if(form.first_name === "") {delete form.first_name};;
        if(form.last_name === "") {delete form.last_name};;
        if(form.nickname === "") {delete form.nickname};;
        if(form.email === "") {delete form.email};;

        api.updateUser(this.props.user._id, form, (result) => {
            let data = JSON.parse(result);
            console.log(data)
        })

        this.setState({
            first_name: "",
            last_name: "",
            nickname: "",
            email: "",
            addressesDialog: false,
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

    toggleAddressesDialog() {
        this.setState(prevState => ({
          addressesDialog: !prevState.addressesDialog
        }));
    }


    render() {

        const {user, open, close} = this.props

        return(
            <Dialog
            open={open}
            >
                <DialogTitle id="form-dialog-title">Edit Personal Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    To edit any of the following fields, make your changes and click submit.
                    </DialogContentText>
                    <br></br>
                    First Name: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="first_name"
                        placeholder={user.first_name}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Last Name:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="last_name"
                        placeholder={user.last_name}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Nickname:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="nickname"
                        placeholder={user.nickname ? user.nickname : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Email Address:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="email"
                        placeholder={user.email}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    <Button variant="outlined" onClick={this.toggleAddressesDialog} style={{width: "100%"}}>
                        <Icon>home</Icon> &nbsp;
                        {user.address ? "Edit Home Address" : "Add Home Address"}
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.editUser}  variant="contained" color="primary">Submit</Button>
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
                {this.state.addressesDialog && <AddressesDialog userId={user._id} address={user.address} open={this.state.addressesDialog} close={this.toggleAddressesDialog} add={user.address ? false : true} type={"home"}/>}
            </Dialog>
        )
    }
}
export default PersonalDialog