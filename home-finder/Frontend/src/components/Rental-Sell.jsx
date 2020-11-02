import React from 'react';
import PropertyCard from './PropertyCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RentSell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInput : '',
            list_toggle: false
        };
    }

    searchOnSale = () => {
        console.log("on sale");
    }

    searchForRent = () => {
        console.log("For rental");
    }


    handleChange = () => {

    }

    render() {
        const justifySearch = {
            "flex": "none",
            "padding": "32px 21px"
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
                        Sell your home now!
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

                    <div className="col-5 card" style={{"width": "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">List Property</h5>
                            <p className="card-text">Start making money by listing your property for rent or sale.</p>
                            <Link to="/list_form" className="btn btn-primary">
                                Start Listing
                            </Link>
                        </div>
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default RentSell;