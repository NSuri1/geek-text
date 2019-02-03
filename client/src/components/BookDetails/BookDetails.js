import React, { Component } from "react";
import axios from 'axios';
import config from '../../config'

const booksApiUrl =
    `${config.apiBasePath}${config.endpoints.books}`

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: props.location.state.bookId,
            book: null
        }
        this.fetchBookInformation()
    }

    fetchBookInformation() {
        axios.get(`${booksApiUrl}/${this.state.bookId}`)
            .then(response => {
                let results = response.data.results
                this.setState({
                    book: results
                })
            }).catch(error => {
                console.error(error)
                setTimeout(() => {
                    console.log('Trying network request again...')
                    this.fetchBookInformation()
                }, 5000)
            });
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
