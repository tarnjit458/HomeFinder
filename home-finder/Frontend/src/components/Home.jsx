import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentInput : ''
        };
    }

    searchHomes = (e) => {
        // keep user from clicking submit button multiple times
        // e.preventDefault();
        // This method will call a url using axios to search for the specific address 
        // or list of homes close to the address for sale

        console.log(`You clicked search!!! ${this.state.currentInput}`);
    }

    handleChange = (e) => {
        this.setState({currentInput: e.target.value});
    }

    render() {
        const justifySearch = {
            "flex": "none",
            "padding": "32px 21px"
        }

        const container = {
            "paddingTop": "100px",
            "display": "flex",
            "flex-direction": "column",
            "min-height": "90vh"
        }

        const justifyCards = {
            "flexDirection": "row",
            "flexWrap": "wrap",
            "alignItems": "center",
            "flex": "none",
            "padding": "32px 21px"
        }

        return(
            <div>
                <div className="row justify-content-center">
                    <h2>
                        We'll find your next home
                    </h2>
                </div>
                
                <div className="row justify-content-end" style={justifySearch}>
                    <div className="col-5">
                        <input 
                        className="form-control mr-sm-2"
                        type="text" 
                        placeholder="Enter a address, zip code or city..."
                        onChange={this.handleChange}
                        value={this.state.currentInput} 
                        aria-label="Search"/>
                    </div>
                    <div className="col-4">
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={this.searchHomes}>Search</button>
                    </div>
                </div>
                <div className="row card-deck" style={justifyCards}>
                    <div className="card" style={{"width": "18rem"}}>
                        <img className="card-img-top" src="/960x0.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Buy a House!</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/buy" className="btn btn-primary">Search Homes</a>
                        </div>
                    </div>
                    <div className="card" style={{"width": "18rem"}}>
                        <img className="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Sell your house!</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/rent-sell" className="btn btn-primary">Make Money</a>
                        </div>
                    </div>
                    <div className="card" style={{"width": "18rem"}}>
                        <img className="card-img-top" src="/cover-12.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Find a place to rent!</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/rental" className="btn btn-primary">Find Rentals</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
