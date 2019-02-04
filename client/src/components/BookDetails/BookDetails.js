import React, { Component } from "react";
import { api } from '../../api/ApiProvider';

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: props.location.state ? props.location.state.bookId : null,
            book: null
        } 
    }

    componentDidMount() {
        this.fetchBookInformation()
    }

    fetchBookInformation() {
        api.getBookById(this.state.bookId, response => {
            this.setState({
                book: JSON.parse(response).results
            })
        }, error => {
            console.error(error)
            setTimeout(() => {
                console.log('Trying network request again...')
                this.fetchBookInformation()
            }, 5000)
        })
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.book)}
            </div>
        );
    }
}

export default BookDetails;
