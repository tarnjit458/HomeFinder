import React from 'react';

class PropertyCard extends React.Component {
    // Will take in as props:
    // title, description, image_src, button_src, button 
    constructor(props) {
        super(props);
        this.state = {
            currentInput : ''
        };
    }
    render() {
        return(
            <div className="card" style={{"width": "18rem"}}>
                {this.props.image_src === "" ? null : <img className="card-img-top" src={this.props.image_src} alt="Card image cap"/>}
                <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <p className="card-text">{this.props.description}</p>
                <a href={this.props.button_src} className="btn btn-primary">{this.props.button}</a>
                </div>
            </div>
        );
    }
}

export default PropertyCard;