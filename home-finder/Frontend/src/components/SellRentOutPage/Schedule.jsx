import React from "react";
import PropertyCard from "../PropertyCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewApp from "./ReviewApp.jsx";
import {
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.schedule.length > 0 ? this.props.schedule[0] : "",
      time: this.props.schedule.length > 0 ? this.props.schedule[1] : "",
      party: this.props.schedule.length > 0 ? this.props.schedule[2] : 0,
    };
  }

  updateSchedule = () => {
    // update
    this.props.scheduleToggle();
  };

  deleteSchedule = () => {
    // delete
    this.props.scheduleToggle();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitSchedule = (e) => {
    // e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/schedule_appointment/",
        {
          house_id: this.props.home.id,
          date: this.state.date,
          time: this.state.time,
          party_size: this.state.party,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.scheduleToggle(e, []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <ModalHeader toggle={this.props.scheduleToggle}>
          Add/Update Schedule Details
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.updateSchedule}>
            <FormGroup>
              <Label>Date</Label>
              <Input
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                placeholder="2020-01-01"
              />
            </FormGroup>
            <FormGroup>
              <Label for="house_type">Time</Label>
              <Input
                type="text"
                name="time"
                onChange={this.handleChange}
                value={this.state.time}
                placeholder="12:00"
              />
            </FormGroup>
            <FormGroup>
              <Label for="house_type">Party Size</Label>
              <Input
                type="number"
                name="party"
                onChange={this.handleChange}
                value={this.state.party}
                placeholder="0"
              />
            </FormGroup>
            {this.props.schedule.length > 0 ? (
              <FormGroup>
                <Button color="danger">Delete</Button>
              </FormGroup>
            ) : null}
            <ModalFooter>
              <Button color="primary" onClick={this.submitSchedule}>
                Submit
              </Button>{" "}
              <Button color="danger" onClick={this.props.scheduleToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </div>
    );
  }
}

export default Schedule;
