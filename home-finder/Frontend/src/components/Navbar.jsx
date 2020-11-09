import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {withRouter} from 'react-router-dom';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileToggle: false
        }
    }

    profileToggle = () => {
        this.setState({
            profileToggle: !this.state.profileToggle
        });
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/login');
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
                        <Dropdown isOpen={this.state.profileToggle} toggle={this.profileToggle}>
                        <DropdownToggle caret>
                            Profile
                            </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Profile</DropdownItem>
                            <DropdownItem href="/profile">Settings</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>
                    </div>
                </nav>
            </>
        );
    }
}

export default withRouter(NavBar);