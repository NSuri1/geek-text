import React, {
    Component
} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './ShoppingCart.css'
import CartContainer from './CartContainer/CartContainer.js'
import {
    api
} from '../../api/ApiProvider';

class ShoppingCart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            books: [],
            subtotal: 0
        };
    }

    componentDidMount() {
        this.fetchBooksFromCart()
    }

    fetchBooksFromCart() {

        // This is testing a sample cart created through POST
        api.getShoppingCartById("5c78a63f3abd2b0364575ea0", (response) => {
            this.parseIntoBooks(response)
        }, (error) => {
            console.error(error);
            setTimeout(() => {
                console.log('Trying network request again...');
                this.fetchBookInformation();
            }, 5000);
        });

    }

    parseIntoBooks(response) {
        response = JSON.parse(response).results

        var cartTotal = 0
        var bookArray = []
        var someJson

        for (var i = 0; i < response.books.length; i++) {
            someJson = {
                "book_id": response.books[i].book_id,
                "quantity": response.books[i].quantity,
                "saved_for_later": response.books[i].saved_for_later,
                "price": response.books[i].price
            }
            this.state.books.push(someJson)
            cartTotal += response.books[i].quantity * response.books[i].price
        }
        this.setState({
            subtotal: cartTotal
        })
        this.forceUpdate()
    }

    handleRemoveBookFromCart = (book_id) => {

        this.setState({
            books: this.state.books.filter(book => {

                if (book_id !== book.book_id) {
                    return book
                }

            })
        })

    }

    handleChangeBookQuantity = (book_id, newQuantity) => {

        if (newQuantity > 0) {

            this.setState({
                books: this.state.books.map(book => {

                    if (book.book_id === book_id) {
                        book.quantity = newQuantity
                    }
                    return book
                })
            })

        } else {
            this.handleRemoveBookFromCart(book_id)
        }

    }

    render() {
        return ( <
            div >
            <
            h1 > Total number of books: {
                this.state.books
            }. < /h1> <
            CartContainer books = {
                this.state.books
            }
            subtotal = {
                this.state.subtotal
            }
            handleRemoveBookFromCart = {
                this.handleRemoveBookFromCart
            }
            handleChangeBookQuantity = {
                this.handleChangeBookQuantity
            }
            /> <
            h1 className = "subtotal-text" > Subtotal: $ {
                this.state.subtotal
            } < /h1> <
            /div>
        );
    }
}

ShoppingCart.propTypes = {
    books: PropTypes.object,
    subtotal: PropTypes.object
}


export default ShoppingCart;
