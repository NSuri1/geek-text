import React, {
    Component
} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import './BookContainer.css'
import {
    api
} from '../../../../api/ApiProvider';


class BookContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            authors: [],
            description: "",
            published_on: ""
        };

    }


    componentWillMount() {
        api.getBookById(this.props.book.book_id, (response) => {
            var book = JSON.parse(response).results
            this.parseIntoBook(book)
        }, (error) => {
            console.error(error);
            setTimeout(() => {
                console.log('Trying network request again...');
                this.fetchBookInformation();
            }, 5000);
        });
    }

    parseIntoBook(book) {

        this.setState({
            title: book.title
        })
        this.setState({
            description: book.description
        })
        this.setState({
            published_on: book.published_on
        })

        var authorNames = []

        for (var i = 0; i < book.authors.length; i++) {
            authorNames.push(book.authors[i].name)
        }
        this.setState({
            authors: this.state.authors.concat(authorNames)
        })
    }
    handleChangeBookQuantity(e, book_id) {
        this.props.handleChangeBookQuantity(book_id, e.target.value)
    }
    render() {
        return ( < div >
            <
            h1 className = "book-text" > Title: {
                this.state.title
            } < /h1> <
            h1 className = "book-text" > Authors: {
                this.state.authors
            } < /h1> <
            h1 className = "book-text" > Description: {
                this.state.description
            } < /h1> <
            h1 className = "book-text" > Published On: {
                this.state.published_on
            } < /h1> <
            h1 className = "book-text" > Price: $ {
                this.props.book.price
            } < /h1> <
            h1 className = "book-text" > Quantity: {
                this.props.book.quantity
            } < /h1> <
            h1 className = "book-text" > Saved
            for later ? : {
                this.props.book.saved_for_later
            } < /h1> <
            input type = "number"
            min = "0"
            max = "10"
            step = "1"
            value = {
                this.props.book.quantity
            }
            size = "6"
            onChange = {
                (e) => this.handleChangeBookQuantity(e, this.props.book_id)
            }
            /> <
            button onClick = {
                this.props.handleRemoveBookFromCart.bind(this, this.props.book.book_id)
            } > Remove from cart < /button> <
            hr / >
            <
            /div>
        )
    }
}

BookContainer.propTypes = {
    book: PropTypes.object
}

export default BookContainer;
