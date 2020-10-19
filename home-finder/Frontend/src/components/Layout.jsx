import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

class Layout extends React.Component {
    render() {
        const container = {
            "paddingTop": "100px",
            "display": "flex",
            "flexDirection": "column",
            "minHeight": "90vh"
        }
        return(
            <div>
                <Navbar />
                <div className="container" style={container}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Layout;