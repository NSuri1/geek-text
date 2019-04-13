import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { api } from '../../../api/ApiProvider'

class CardsDialog extends Component{

    constructor(props) {
		super(props);
		this.state = {
            card_number: "",
            name_on_card: "",
            expiration_date: "",
            ccv: ""
        }

        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    editCard() {
        let form = this.state

        if(form.card_number === "" && form.name_on_card === "" && form.expiration_date === "" && form.ccv === "") {return}
        if(form.card_number === "") {delete form.card_number};
        if(form.name_on_card === "") {delete form.name_on_card};
        if(form.expiration_date === "") {delete form.expiration_date};
        if(form.ccv === "") {delete form.ccv};

        api.updateCard(this.props.card._id, form, (result) => {
             let data = JSON.parse(result);
             console.log(data)
             
             this.setState({
                card_number: "",
                name_on_card: "",
                expiration_date: "",
                ccv: ""
            })

            if(data.success === true) {
                this.props.update()
                this.props.close()
            }
        })
    }

    deleteCard() {
        api.deleteCardById(this.props.userId, this.props.card._id, (result) => {
             let data = JSON.parse(result);
             console.log(data)

             if(data.success === true) {
                this.props.update()
                this.props.close()
            }
        })
    }

    addCard() {
        let form = this.state
        
        api.createCard(this.props.userId, form, (result) => {
             let data = JSON.parse(result);
             console.log(data)

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

        const {card, open, close, add} = this.props

        return(
            <Dialog
            open={open}
            >
                <DialogTitle id="form-dialog-title">{!add ? "Edit Card" : "Add Card"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>    
                    {!add && "To edit any of the following fields, make your changes and click submit. To remove this card, click the delete button."}
                    {add && "Fill out the following fields then click add to save the new card."} 
                    </DialogContentText>
                    <br></br>
                    Card Number: 
                    <InputMask
                        mask="9999 9999 9999 9999 9999"
                        maskChar=" "
                        onChange={this.handleInput}
                    >
                        {() => <TextField
                        style={{marginBottom : "15px"}}
                        placeholder={card ? card.card_number : ""}
                        name="card_number"
                        margin="dense"
                        fullWidth
                        />}
                    </InputMask>
                    Name on Card:
                    <TextField 
                        style={{marginBottom : "15px"}}
                        margin="dense"
                        name="name_on_card"
                        placeholder={card ? card.name_on_card : ""}
                        onChange={this.handleInput}
                        type="text"
                        fullWidth
                    />
                    Expiration Date:
                    <InputMask
                        mask="99/9999"
                        maskChar=" "
                        onChange={this.handleInput}
                        
                    >
                        {() => <TextField
                        style={{marginBottom : "15px"}}
                        placeholder={card ? card.expiration_date : ""}
                        name="expiration_date"
                        margin="dense"
                        fullWidth
                        />}
                    </InputMask>
                    CCV / CVV:
                    <InputMask
                        mask="9999"
                        maskChar=" "
                        onChange={this.handleInput}
                    >
                        {() => <TextField
                        style={{marginBottom : "15px"}}
                        placeholder={card ? card.ccv : ""}
                        name="ccv"
                        margin="dense"
                        fullWidth
                        />}
                    </InputMask>
                </DialogContent>
                <DialogActions>
                    {!add && <Button onClick={this.editCard}  variant="contained" color="primary">Submit</Button>}
                    {!add && <Button onClick={this.deleteCard}  variant="contained" color="secondary">Delete</Button>}
                    {add && <Button onClick={this.addCard}  variant="contained" color="primary">Add</Button>}
                    <Button onClick={close} variant="contained" color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default CardsDialog