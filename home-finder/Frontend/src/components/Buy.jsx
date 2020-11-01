import React from 'react';

class Buy extends React.Component {
    render() {
        const justifyCards = {
            "flexDirection": "row",
            "flexWrap": "wrap",
            "alignItems": "center",
            "flex": "none",
            "padding": "32px 21px"
        }
        return(
            <div>
                <div className="row card-deck" style={justifyCards}>
                    <div className="card" style={{"width": "18rem"}}>
                        <img className="card-img-top" src="/960x0.jpg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Buy a House!</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/buy" className="btn btn-primary">Search Homes</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Buy;