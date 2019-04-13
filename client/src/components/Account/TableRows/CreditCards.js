import React, { Component } from 'react';
import CardsDialog from '../Dialogs/CardsDialog';
import { TableRow, TableCell } from '@material-ui/core';

class CreditCards extends Component{

    constructor(props) {
		super(props);
        this.state = {
            cardsDialog: false
        }


        this.toggleCardsDialog = this.toggleCardsDialog.bind(this);
    }

    toggleCardsDialog() {
        this.setState(prevState => ({
          cardsDialog: !prevState.cardsDialog
        }));
    }
    
    render() {

        const {userId, tableStyle, card, update} = this.props

        return(
            <TableRow >
                <TableCell style={tableStyle.body}>{card.card_number}</TableCell>
                <TableCell style={tableStyle.body} align="right">{card.name_on_card}</TableCell>
                <TableCell style={tableStyle.body} align="right">{card.expiration_date}</TableCell>
                <TableCell style={tableStyle.body} align="right">{card.ccv}</TableCell>
                <TableCell style={tableStyle.body} align="center"><button onClick={this.toggleCardsDialog} style={{backgroundColor: "brown", color: "white"}}>Edit</button></TableCell>
                {this.state.cardsDialog && <CardsDialog userId={userId} card={card} open={this.state.cardsDialog} close={this.toggleCardsDialog} add={false} update={update}/>}
            </TableRow>
        )
    }
}
export default CreditCards