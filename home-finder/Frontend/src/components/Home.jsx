import React from 'react';
import PropertyCard from './PropertyCard.jsx';
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
                    <PropertyCard title="Buy a House!" 
                    description="Some quick example text to build on the card title and make up the bulk of the card's content."
                    image_src="/960x0.jpg"
                    button="Search Homes"
                    button_src="/buy"
                    />
                    <PropertyCard title="Sell your house!" 
                    description="Some quick example text to build on the card title and make up the bulk of the card's content."
                    image_src="/For-sale-sign.jpg"
                    button="Make Money"
                    button_src="/rent-sell"
                    />
                    <PropertyCard title="Find a place to rent!" 
                    description="Some quick example text to build on the card title and make up the bulk of the card's content."
                    image_src="/cover-12.jpg"
                    button="Find Rentals"
                    button_src="/rent"
                    />
                </div>
            </div>
        );
    }
}

export default Home;
