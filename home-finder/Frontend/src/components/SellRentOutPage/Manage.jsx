import React from "react";
import axios from "axios";
import ReviewApp from "./ReviewApp.jsx";
import { Button, ModalBody, ModalHeader, ModalFooter, Table } from "reactstrap";
import Details from "./Details.jsx";
import Schedule from "./Schedule.jsx";

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: this.props.home,
      inspectAppModal: false,
      scheduleModal: false,
      editDetailModal: false,
      selectedSchedule: [],
      offer: [],
      totalSchedules: [],
      selectedHouseApp: [],
      scheduleAction: ""
    };
  }

  componentDidMount() {
    this.getSchedules(this.state.home.id);
    this.getHouseApplications(this.state.home.id);
  }

  removeHomeCard = (e) => {
    axios.delete("http://100.24.18.12:8000/api/edit_house/" + this.state.home.id, {
      headers: {
        Authorization: "Token " + localStorage.getItem("user"),
      }
    }).then((response) => {
      console.log(response);
      this.props.manageHouseToggle(e, {});
    }).catch((error) => {
      console.log(error);
    });
  };

  inspectAppToggle = (e, r) => {
    this.setState({
      inspectAppModal: !this.state.inspectAppModal,
      offer: r,
    });
    this.getHouseApplications(this.state.home.id);
  };

  editDetailToggle = () => {
    // send update to house
    this.setState({
      editDetailModal: !this.state.editDetailModal,
    });
  };

  scheduleToggle = (e, action, r) => {
    e.preventDefault();
    this.setState({
      selectedSchedule: r,
      scheduleModal: !this.state.scheduleModal,
      scheduleAction: action
    });
    this.getSchedules(this.state.home.id);
  };

  getSchedules = (id) => {
    axios
      .get("http://100.24.18.12:8000/api/display_schedule/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: id,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          totalSchedules: response.data.Schedule,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getHouseApplications = (id) => {
    axios
      .get("http://100.24.18.12:8000/api/display_application/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: id,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          selectedHouseApp: response.data.application,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.inspectAppModal) {
      return (
        <ReviewApp
          inspectAppToggle={this.inspectAppToggle}
          offer={this.state.offer}
          isRental={this.props.isRental}
        />
      );
    } else if (this.state.editDetailModal) {
      return (
        <Details
          editDetailToggle={this.editDetailToggle}
          home={this.state.home}
          isRental={this.props.isRental}
        />
      );
    } else if (this.state.scheduleModal) {
      return (
        <Schedule
          schedule={this.state.selectedSchedule}
          scheduleToggle={this.scheduleToggle}
          isRental={this.props.isRental}
          home={this.state.home}
          action={this.state.scheduleAction}
        />
      );
    } else {
      const schedule = [
        ["11/21/2020", "14:00", "4"],
        ["11/21/2020", "14:30", "2"],
        ["11/21/2020", "15:00", "10"],
      ];
      const offers = [
        ["Eric Lin", "100000", "800", "Mortgage"],
        ["Bob Mcbobby", "97,001", "690", "All cash"],
        ["Mary Bob", "98,001", "710", "Mortgage"],
      ];
      return (
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
            <Button onClick={this.editDetailToggle} color="primary">
              Edit
            </Button>{" "}
            <Button color="danger" onClick={this.removeHomeCard}>Remove</Button>
            {/*
                                this.state.totalListing.house_num.length > 0 ? 
                                this.state.totalListing.house_num.map(() => {}) :
                                <p>You have no offers for this house.</p>*/}
            <h3>Applications</h3>
            <Table hover={true}>
              <thead>
                <tr>
                  <th>{this.props.isRental ? "Salary($)" : "Offer($)"}</th>
                  <th>Name</th>
                  <th>Credit Score</th>
                  <th>Employment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedHouseApp.map((r) => {
                  return (
                    <tr onClick={(e) => this.inspectAppToggle(e, r)}>
                      <td>{r.offer}</td>
                      <td>{r.user.first_name} {r.user.last_name}</td>
                      <td>{r.credit_score}</td>
                      <td>{r.employment}</td>
                      <td>{r.status}</td>
                    </tr>
                  );
                })}
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
                {this.state.totalSchedules.map((r) => {
                  return (
                    <tr onClick={(e) => this.scheduleToggle(e, "edit", r)}>
                      <td>{r["date"]}</td>
                      <td>{r["time"]}</td>
                      <td>{r["party_size"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button onClick={(e) => this.scheduleToggle(e, "add", [])} color="primary">
              Add
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.manageHouseToggle}>
              Cancel
            </Button>
          </ModalFooter>{" "}
        </div>
      );
    }
  }
}

export default Manage;
