import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const profileColor = {
            "color": "white"
        }
        return(
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="/">Home Finder</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/buy">Buy</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/rent-sell">Sell</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/rent">Rent</a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/rent-sell">Rent Out</a>
                            </li>
                        </ul>
                        <a className="nav-link" style={profileColor} href="/profile">Profile</a>
                    </div>
                </nav>
            </>
        );
    }
}

export default NavBar;