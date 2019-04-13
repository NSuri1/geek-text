import React, { Component } from 'react';
import AddressesDialog from '../Dialogs/AddressesDialog';
import { TableRow, TableCell } from '@material-ui/core';

class ShippingAddress extends Component{

    constructor(props) {
		super(props);
        this.state = {
            addressesDialog: false,
        }


        this.toggleAddressesDialog = this.toggleAddressesDialog.bind(this);
    }

    toggleAddressesDialog() {
        this.setState(prevState => ({
          addressesDialog: !prevState.addressesDialog
        }));
    }
    
    render() {

        const {userId, tableStyle, address, update} = this.props

        return(
            <TableRow>
                <TableCell style={tableStyle.body}>{address.address_line1}<br></br>{address.address_line2}</TableCell>
                <TableCell style={tableStyle.body} align="right">{address.city}</TableCell>
                <TableCell style={tableStyle.body} align="right">{address.state}</TableCell>
                <TableCell style={tableStyle.body} align="right">{address.zip}</TableCell>
                <TableCell style={tableStyle.body} align="right">{address.country}</TableCell> 
                <TableCell style={tableStyle.body} align="center"><button onClick={this.toggleAddressesDialog} style={{backgroundColor: "brown", color: "white"}}>Edit</button></TableCell>
                {this.state.addressesDialog && <AddressesDialog userId={userId} address={address} open={this.state.addressesDialog} close={this.toggleAddressesDialog} add={false} type={"shipping"} update={update}/>}
            </TableRow>
        )
    }
}
export default ShippingAddress