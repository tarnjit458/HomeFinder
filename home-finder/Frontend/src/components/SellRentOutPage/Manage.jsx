import React from 'react';
import axios from 'axios';
import ReviewApp from './ReviewApp.jsx';
import { Button, ModalBody, ModalHeader, ModalFooter, Table } from 'reactstrap';
import Details from './Details.jsx';
import Schedule from './Schedule.jsx';

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: this.props.home,
            inspectAppModal: false,
            scheduleModal: false,
            editDetailModal: false,
            selectedSchedule: [],
            offer: []
        }
    }

    removeHomeCard = () => {
        // reload page
    }

    inspectAppToggle = (e, r) => {
        console.log("hit");
        this.setState({
            inspectAppModal: !this.state.inspectAppModal,
            offer: r
        });
    }

    editDetailToggle = () => {
        // send update to house
        this.setState({
            editDetailModal: !this.state.editDetailModal
        });
    }

    scheduleToggle = (e, r) => {
        // a
        this.setState({
            selectedSchedule: r,
            scheduleModal: !this.state.scheduleModal
        });
    }

    render() {
        if (this.state.inspectAppModal) {
            return(<ReviewApp 
                inspectAppToggle={this.inspectAppToggle}
                offer={this.state.offer}
                isRental={this.props.isRental}
                />);
        } else if (this.state.editDetailModal) {
            return(<Details
                editDetailToggle={this.editDetailToggle}
                home={this.state.home}
                isRental={this.props.isRental}
                />);
        } else if (this.state.scheduleModal) {
            return(<Schedule 
                    schedule={this.state.selectedSchedule} 
                    scheduleToggle={this.scheduleToggle}
                    isRental={this.props.isRental}
                    />);
        } else {
            const schedule = [
                ["11/21/2020", "14:00", "4"],
                ["11/21/2020", "14:30", "2"],
                ["11/21/2020", "15:00", "10"]
            ];
            const offers = [
                ["Eric Lin", "100000", "800","Mortgage"],
                ["Bob Mcbobby", "97,001", "690", "All cash" ],
                ["Mary Bob", "98,001", "710", "Mortgage" ],
            ]
            return(
                <div>
                        <ModalHeader toggle={this.props.manageHouseToggle}>
                            {this.state.home.address},{this.state.home.city},
                            {this.state.home.state}, {this.state.home.zip_code}
                        </ModalHeader>
                        <ModalBody>
                            <Table borderless={true}>
                                <tbody>
                                    <tr>
                                        <td>{this.props.isRental ? "Monthly Price:" : "Price:"}</td>
                                        <td>${this.state.home.cost}</td>
                                    </tr>
                                    <tr>
                                        <td>Description:</td>
                                        <td>{this.state.home.description}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button onClick={this.editDetailToggle} color="primary">Edit</Button>{' '}
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
                                    <th>Name</th>
                                    <th>{this.props.isRental ? "Salary($)" : "Offer($)"}</th>
                                    <th>Credit Score</th>
                                    <th>Payment Type</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {/* <tr onClick={(e) => this.props.handleRowClick(e, r)}> */}
                                    {
                                        offers.map((r) => {
                                            return(
                                                <tr onClick={(e) => this.inspectAppToggle(e, r)}>
                                                    <td>{r[0]}</td>
                                                    <td>{r[1]}</td>
                                                    <td>{r[2]}</td>
                                                    <td>{r[3]}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            <h3>Upcoming Open Houses</h3>
                            <Table hover={true}>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th># of Visitors</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        schedule.map((r) => {
                                            return(
                                                <tr onClick={(e) => this.scheduleToggle(e, r)}>
                                                    <td>{r[0]}</td>
                                                    <td>{r[1]}</td>
                                                    <td>{r[2]}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                            <Button onClick={(e) => this.scheduleToggle(e, [])} color="primary">Add</Button>
                        </ModalBody>     
                        <ModalFooter>
                            <Button color="danger" onClick={this.props.manageHouseToggle}>Cancel</Button>
                        </ModalFooter> </div>
            );
        }
    }
}

export default Manage;