import React, {
    Component
} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './CartContainer.css';
import BookContainer from './BookContainer/BookContainer.js';

class CartContainer extends Component {

    render() {
        return this.props.books.map(book => ( <
            div >
            <
            BookContainer key = {
                book.book_id
            }
            book = {
                book
            }
            handleRemoveBookFromCart = {
                this.props.handleRemoveBookFromCart
            }
            handleChangeBookQuantity = {
                this.props.handleChangeBookQuantity
            }
            /> <
            /div>
        ));
    }

}

CartContainer.propTypes = {
    book: PropTypes.object,
}

export default CartContainer;
