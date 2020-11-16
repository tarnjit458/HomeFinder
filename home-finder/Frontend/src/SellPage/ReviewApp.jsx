import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, Button,
    CardTitle, CardSubtitle, Row, Col,
    Modal, ModalBody, ModalHeader, ModalFooter, Table, Badge
}from 'reactstrap';

class ReviewApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <ModalHeader toggle={this.props.inspectAppToggle}>Individual Application</ModalHeader>
                <ModalBody>
                <Table>
                    <tbody>
                        {/* <tr onClick={(e) => this.props.handleRowClick(e, r)}> */}
                        <tr>
                            <td>Eric</td>
                            <td>Lin</td>
                            <td></td>
                        </tr>
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
                <Button color="primary">Approve</Button>{' '}
                <Button color="danger">Reject</Button>
                </ModalBody>
                <ModalFooter>
                        <Button color="danger" onClick={this.props.inspectAppToggle}>Cancel</Button>
                </ModalFooter>
            </div>
        );
    }

}

export default ReviewApp;