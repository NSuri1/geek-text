import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { api } from '../../../api/ApiProvider';
import menu from './FormMenuOpts';

class AddressesDialog extends Component{

    constructor(props) {
		super(props);
        this.state = {
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        }
        
        this.editAddress = this.editAddress.bind(this);
        this.deleteAddress = this.deleteAddress.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    editAddress() {
        let form = this.state

        if(form.address_line1 === "" && form.address_line2 === "" && form.city === "" && form.state === "" && form.zip === "" && form.country === "") {return}
        if(form.address_line1 === "") {delete form.address_line1};;
        if(form.address_line2 === "") {delete form.address_line2};;
        if(form.city === "") {delete form.city};;
        if(form.state === "") {delete form.state};;
        if(form.zip === "") {delete form.zip};;
        if(form.country === "") {delete form.country};;

        api.updateAddress(this.props.address._id, form, (result) => {
            let data = JSON.parse(result);
            console.log(data)

            this.setState({
                address_line1: "",
                address_line2: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            })

            if(data.success === true) {
                this.props.update()
                this.props.close()
            }
        })

        this.setState({
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        })
    }

    deleteAddress() {
        api.deleteAddressById(this.props.userId, this.props.address._id, this.props.type, (result) => {
            let data = JSON.parse(result);
            console.log(data)
        })
    }

    addAddress() {
        let form = this.state
        
        api.createAddress(this.props.userId, this.props.type, form, (result) => {
            let data = JSON.parse(result);
            console.log(data)
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

        const {address, open, close, add} = this.props

        return(
            <Dialog
            open={open}
            >
                <DialogTitle id="form-dialog-title">{!add ? "Edit Address" : "Add Address"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>    
                    {!add && "To edit any of the following fields, make your changes and click submit. To remove this address, click the delete button."}
                    {add && "Fill out the following fields then click add to save the new address."} 
                    </DialogContentText>
                    <br></br>
                    Address Line 1: 
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="address_line1"
                        placeholder={address ? address.address_line1 : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Address Line 2:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="address_line2"
                        placeholder={address ? address.address_line2 : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    City:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="city"
                        placeholder={address ? address.city : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    State:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="state"
                        placeholder={address ? address.state : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Zip:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="zip"
                        placeholder={address ? address.zip : ""}
                        onChange={this.handleInput}
                        type="email"
                        fullWidth
                    />
                    Country:
                    {/* <TextField 
                    style={{marginBottom : "15px"}}
                    margin="dense"
                    name="country"
                    placeholder={address ? address.country : ""}
                    onChange={this.handleInput}
                    type="email"
                    fullWidth
                    /> */}
                    <Select
                        native
                        onChange={this.handleInput}
                        name="country"
                        displayEmpty
                        style={{marginBottom : "15px"}}
                        fullWidth
                    >
                        <option value="">{address ? address.country : ""}</option>
                        {menu.countries.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    {!add && <Button onClick={this.editAddress}  variant="contained" color="primary">Submit</Button>}
                    {!add && <Button onClick={this.deleteAddress}  variant="contained" color="secondary">Delete</Button>}
                    {add && <Button onClick={this.addAddress}  variant="contained" color="primary">Add</Button>}
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default AddressesDialog