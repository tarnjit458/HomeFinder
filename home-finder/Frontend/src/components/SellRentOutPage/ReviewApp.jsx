import React from 'react';
import axios from 'axios';
import { Button, ModalBody, ModalHeader, ModalFooter, Table, Badge
}from 'reactstrap';

class ReviewApp extends React.Component {
    constructor(props) {
        super(props);
    }

    offerResponse = (decision) => {
        // accept or reject action
    }

    render() {
        return(
            <div>
                <ModalHeader toggle={this.props.inspectAppToggle}>{this.props.offer[0]}'s Offer</ModalHeader>
                <ModalBody>
                <Table>
                    <tbody>
                        <tr>
                            <td>{this.props.isRental ? "Salary:" : "Price:"}</td>
                            <td>${this.props.offer[1]}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Credit Score:</td>
                            <td>{this.props.offer[2]}</td>
                            <td>Payment Type:</td>
                            <td>{this.props.offer[3]}</td>
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