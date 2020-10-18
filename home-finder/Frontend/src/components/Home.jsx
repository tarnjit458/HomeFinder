import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const justify = {
            "justify-content": "center",
        }

        const justifySearch = {
            "flex": "none",
            "padding": "32px 21px"
        }

        const container = {
            "padding-top": "100px",
            "display": "flex",
            "flex-direction": "column",
            "min-height": "90vh"
        }

        const justifyCards = {
            "flex-direction": "row",
            "flex-wrap": "wrap",
            "align-items": "center",
            "flex": "none",
            "padding": "32px 21px"
        }

        return(
            <div>
                <Navbar />
                <div className="container" style={container}>
                    <div className="row justify-content-center">
                        <h2>
                            We'll find your next home
                        </h2>
                    </div>
                    
                    <div className="row justify-content-end" style={justifySearch}>
                        <div className="col-5">
                            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                        </div>
                        <div className="col-4">
                            <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </div>
                    <div className="row card-deck" style={justifyCards}>
                        <div class="card" style={{"width": "18rem;"}}>
                            <img class="card-img-top" src="/960x0.jpg" alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">Buy a House!</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div class="card" style={{"width": "18rem;"}}>
                            <img class="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">Sell your house!</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                        <div class="card" style={{"width": "18rem;"}}>
                            <img class="card-img-top" src="/cover-12.jpg" alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title">Find a place to rent!</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
