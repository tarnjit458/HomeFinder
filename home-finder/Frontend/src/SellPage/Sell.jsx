import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReviewApp from './ReviewApp.jsx';
import { Card, CardText, CardBody, Button,
    CardTitle, CardSubtitle, Row, Col,
    Modal, ModalBody, ModalHeader, ModalFooter, Table, Badge, Container
}from 'reactstrap';

class Sell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentInput : '',
            list_toggle: false,
            manageHouseModal: false,
            inspectAppModal: false
        };
    }

    componentDidMount() {
        // call backend to retrieve current user's listing
    }

    searchOnSale = () => {
        console.log("on sale");
    }

    searchForRent = () => {
        console.log("For rental");
    }

    manageHouseToggle = () => {
        this.setState({
            manageHouseModal: !this.state.manageHouseModal
        });
    }

    deleteHouse = (e) => {
        // delete housse from database
        // check event.target to get house info
    }

    handleRowClick = (e, r) => {
        // handle row click for application list
        console.log(e.target, r);
        this.setState({
            inspectAppModal: !this.state.inspectAppModal
        });
        
    }

    handleChange = () => {

    }

    handleApproval = () => {
        // handle approve or reject application
        // Approved application will close house for further apps
        // Reject will remove application from the pool
    }

    inspectAppToggle = () => {
        this.setState({
            inspectAppModal: !this.state.inspectAppModal
        });
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
            <Container>
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
                
                <Row>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <img className="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                                <Row className="pt-2">
                                    <Col md="8">
                                        <CardTitle tag="h5">Home Address</CardTitle>
                                    </Col>
                                    <Col>
                                        <Badge color="info">On Market</Badge>
                                    </Col>
                                </Row>

                                <Button onClick={this.manageHouseToggle} color="primary">Manage</Button>{' '}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <img className="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                                <Row className="pt-2">
                                    <Col md="7">
                                        <CardTitle tag="h5">Home Address</CardTitle>
                                    </Col>
                                    <Col>
                                        <Badge color="warning">Pending Sale</Badge>
                                    </Col>
                                </Row>

                                <Button onClick={this.manageHouseToggle} color="primary">Manage</Button>{' '}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <img className="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                                <Row className="pt-2">
                                    <Col md="8">
                                        <CardTitle tag="h5">Home Address</CardTitle>
                                    </Col>
                                    <Col>
                                        <Badge color="success">Sold</Badge>
                                    </Col>
                                </Row>

                                <Button onClick={this.manageHouseToggle} color="primary">Manage</Button>{' '}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card>
                            <CardBody>
                                <img className="card-img-top" src="/For-sale-sign.jpg" alt="Card image cap"/>
                                <Row className="pt-2">
                                    <Col md="8">
                                        <CardTitle tag="h5">Home Address</CardTitle>
                                    </Col>
                                    <Col>
                                        <Badge color="success">Sold</Badge>
                                    </Col>
                                </Row>

                                <Button onClick={this.manageHouseToggle} color="primary">Manage</Button>{' '}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">

                        <Card>
                            <CardBody>
                                <h5 className="card-title">List Property</h5>
                                <p className="card-text">Sell your house now!</p>
                                <Link to="/list_form" className="btn btn-primary">
                                    Start Listing
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <Modal isOpen={this.state.manageHouseModal} toggle={this.manageHouseToggle}>
                    { !this.state.inspectAppModal ? <div>
                    <ModalHeader toggle={this.manageHouseToggle}>House Address</ModalHeader>
                    <ModalBody>
                        <Table borderless={true}>
                            <tbody>
                                {/* <tr onClick={(e) => this.props.handleRowClick(e, r)}> */}
                                <tr>
                                    <td>$100,000</td>
                                    <td>Single Family House</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>3 bd</td>
                                    <td>2 ba</td>
                                    <td>1800 sqft</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button color="primary">Edit</Button>{' '}
                        <Button color="danger">Remove</Button>
                        {/*
                            this.state.totalListing.house_num.length > 0 ? 
                            this.state.totalListing.house_num.map(() => {}) :
                            <p>You have no offers for this house.</p>*/
                        }
                        <h3>Applications</h3>
                        <Table hover={true}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Offer</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* <tr onClick={(e) => this.props.handleRowClick(e, r)}> */}
                                <tr onClick={(e) => {this.handleRowClick(e, "Row")}}>
                                    <td>1</td>
                                    <td>Eric</td>
                                    <td>Lin</td>
                                    <td>$100,000</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Bob</td>
                                    <td>Mcbobby</td>
                                    <td>$100,001</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button color="primary" onClick={this.inspectAppToggle}>Review</Button>
                        <h3>Upcoming Open Houses</h3>
                        <Table hover={true}>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Registered</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* <tr onClick={(e) => this.props.handleRowClick(e, r)}> */}
                                <tr>
                                    <td>11/21/2020</td>
                                    <td>14:30</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                      <td>11/21/2020</td>
                                    <td>14:30</td>
                                    <td>4</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button color="primary">Edit</Button>
                    </ModalBody>     
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={this.manageHouseToggle}>Edit</Button>{' '}
                        <Button color="danger" onClick={this.manageHouseToggle}>Cancel</Button>
                    </ModalFooter> </div>:
                    /* pass in function that updates the table in modal*/
                    <ReviewApp inspectAppToggle={this.inspectAppToggle} />}
                </Modal>
            </Container>
        );
    }
}

export default Sell;