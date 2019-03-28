import React, { Component } from 'react';
import { api } from '../../api/ApiProvider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './Account.css';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import CredentialsDialog from './Dialogs/CredentialsDialog';
import PersonalDialog from './Dialogs/PersonalDialog';
import CardsDialog from './Dialogs/CardsDialog';
import ShippingAddress from './ShippingAddress';
import AddressesDialog from './Dialogs/AddressesDialog';

const tableStyle = {
    head: {
        color: "white",
        background: "brown"
    },
    body: {
        color: "white",
        borderBottom: "1px solid white"
    }
};

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                address: {},
                shipping_addresses: [{}],
                credit_cards: [{}],
            },
            credentialsDialog: false,
            personalDialog: false,
            cardsDialog: false,
            addressesDialog: false,
            updated: false
        }

        this.toggleCredentialsDialog = this.toggleCredentialsDialog.bind(this);
        this.togglePersonalDialog= this.togglePersonalDialog.bind(this);
        this.toggleCardsDialog = this.toggleCardsDialog.bind(this);
        this.toggleAddressesDialog = this.toggleAddressesDialog.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.editCard = this.editCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    componentDidMount() {
        this.loadUserInfo();
    }

    toggleCredentialsDialog() {
        this.setState(prevState => ({
          credentialsDialog: !prevState.credentialsDialog
        }));
    }

    togglePersonalDialog() {
        this.setState(prevState => ({
          personalDialog: !prevState.personalDialog
        }));
    }

    toggleCardsDialog() {
        this.setState(prevState => ({
          cardsDialog: !prevState.cardsDialog
        }));
    }

    toggleAddressesDialog() {
        this.setState(prevState => ({
          addressesDialog: !prevState.addressesDialog
        }));
    }

    toggleUpdate() {
        if(this.state.updated) {this.componentDidMount.bind(this)}

        this.setState(prevState => ({
          updated: !prevState.updated
        }));
    }

   editCard() {

    }

    addCard() {

    }

    deleteCard() {

    }

    loadUserInfo() {
        api.getUserById(this.props.userID, (result) => {
            let data = JSON.parse(result);
            console.log(data)
			this.setState({
				user: data.results
            });
            api.getAddressById(data.results.address, (result) => {
                let addressData = JSON.parse(result);
                console.log(addressData)
                this.setState({
                    user: {
                        ...this.state.user,
                        address: addressData.results,
                        credit_cards: [],
                        shipping_addresses: []
                    }
                });
                let shippingData = ""
                data.results.shipping_addresses.map(address => {
                    api.getAddressById(address, (result) => {
                        shippingData = JSON.parse(result);
                        console.log(shippingData)
                        this.setState({
                            user: {
                                ...this.state.user,
                                shipping_addresses: [...this.state.user.shipping_addresses, shippingData.results]
                            }
                        });
                    });
                });            
                let cardData = ""
                data.results.credit_cards.map(card => {
                        api.getCardById(card, (result) => {
                            cardData = JSON.parse(result);
                            console.log(cardData)
                            this.setState({
                                user: {
                                    ...this.state.user,
                                    credit_cards: [...this.state.user.credit_cards, cardData.results],
                                }
                            });                       
                        });
                });  
                
            });
        });
    }

    render() {

        const {user, credentialsDialog, personalDialog, cardsDialog, addressesDialog} = this.state

        return (
            <Grid container className="account-container" direction ="column" justify="center" alignItems="center">

                {/* This block is the Login Credentials section */}
                <Grid container item xs={5} className="account-section" direction ="column" justify="center" alignItems="center">    
                    <Typography style={{borderBottom: "2px solid brown"}} variant="h4" color="inherit">Login Credentials</Typography>
                    <br></br>
                    <Grid item xs={12} >
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Username: </b>{user.username}</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12} >
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Password: </b>********</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Button onClick={this.toggleCredentialsDialog} style={{backgroundColor: "brown", color: "white", align: "center"}}>Edit</Button>
                    </Grid>
                </Grid>

                {credentialsDialog && <CredentialsDialog user={user} open={credentialsDialog} close={this.toggleCredentialsDialog} update={this.toggleUpdate}/>}

                <br></br>
                <br></br>
                
                {/* This block is the Personal Info section */}
                <Grid container item xs={5} className="account-section" direction ="column" justify="center" alignItems="center"> 
                    <Typography style={{borderBottom: "2px solid brown"}} variant="h4" color="inherit">Personal info</Typography>
                    <br></br>
                    <Grid item xs={12} >
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>First Name: </b>{user.first_name}</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Last Name: </b>{user.last_name}</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Nickname: </b>{user.nickname ? user.nickname : ""}</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Email Address: </b>{user.email}</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        {!user.address && <Typography variant="subtitle1" color="inherit" gutterBottom><b>Home Address: </b></Typography>}
                        {user.address &&
                        <Typography variant="subtitle1" color="inherit" gutterBottom><b>Home Address: </b>{user.address.address_line1 ? user.address.address_line1+" " : ""}
                        {user.address.address_line2 ? user.address.address_line2+" , " : ""} {user.address.city ? user.address.city+" , " : ""} {user.address.state ? user.address.state+" , " : ""}
                        {user.address.zip ? user.address.zip+" ," : ""} {user.address.country ? user.address.country : ""}</Typography>}
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Button onClick={this.togglePersonalDialog} style={{backgroundColor: "brown", color: "white"}}>Edit</Button>
                    </Grid>
                </Grid>  

                {personalDialog && <PersonalDialog user={user} open={personalDialog} close={this.togglePersonalDialog}  update={this.toggleUpdate}/>}
                

                <br></br>
                <br></br>

                {/* This block is the Credit Cards section */}
                <Grid container item xs={8} className="account-section" direction ="column" justify="center" alignItems="center">
                    <Typography variant="h4" color="inherit">Credit Cards</Typography>
                    <br></br>
                    <Grid item xs={12}>
                        <Table style={{tableLayout: "inherit"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableStyle.head}>Card Number</TableCell>
                                    <TableCell style={tableStyle.head} align="right">Name On Card</TableCell>
                                    <TableCell style={tableStyle.head} align="right">Exp. Date</TableCell>
                                    <TableCell style={tableStyle.head}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.credit_cards.map(card => (
                                    <TableRow key={card._id}>
                                        <TableCell style={tableStyle.body}>{card.card_number}</TableCell>
                                        <TableCell style={tableStyle.body} align="right">{card.name_on_card}</TableCell>
                                        <TableCell style={tableStyle.body} align="right">{card.expiration_date}</TableCell>
                                        <TableCell style={tableStyle.body} align="center"><button onClick={this.toggleCardsDialog} style={{backgroundColor: "brown", color: "white"}}>Edit</button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Button style={{backgroundColor: "brown", color: "white"}}>ADD</Button>
                    </Grid>
                </Grid>

                <CardsDialog open={cardsDialog} close={this.toggleCardsDialog}/>

                <br></br>
                <br></br>

                {/* This block is the Shipping Addresses section */}
                <Grid container item xs={8} className="account-section" direction ="column" justify="center" alignItems="center">
                    <Typography variant="h4" color="inherit">Shipping Addresses</Typography>
                    <br></br>
                    <Grid item xs={12}>
                        <Table style={{tableLayout: "inherit"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableStyle.head}>Address Line</TableCell>
                                    <TableCell style={tableStyle.head} align="right">City</TableCell>
                                    <TableCell style={tableStyle.head} align="right">State</TableCell>
                                    <TableCell style={tableStyle.head} align="right">Zip</TableCell>
                                    <TableCell style={tableStyle.head} align="right">Country</TableCell>
                                    <TableCell style={tableStyle.head}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user.shipping_addresses.map(address => (<ShippingAddress key={address._id} userId={user._id} tableStyle={tableStyle} address={address} add={false}/>))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Button onClick={this.toggleAddressesDialog} style={{backgroundColor: "brown", color: "white"}}>ADD</Button>
                    </Grid>
                </Grid>    

                {addressesDialog && <AddressesDialog userId={user._id} open={addressesDialog} close={this.toggleAddressesDialog} add={true} type={"shipping"}/>}        

            </Grid>      
        );
    }
}

export default Account;