import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../Home';
import BookDetails from '../BookDetails';

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: "/book-details",
                                    state: { bookId: "5c53ab565fdd2d441bead231" }
                                }}>
                                    Book Details
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Home} />
                    <Route path="/book-details" component={BookDetails} />
                </div>
            </Router >
        )
    }
}

export default AppRouter;