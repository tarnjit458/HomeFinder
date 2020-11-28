import React from "react";
import axios from "axios";
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
      date: this.props.schedule ? this.props.schedule.date : "",
      time: this.props.schedule ? this.props.schedule.time : "",
      party: this.props.schedule ? this.props.schedule.party_size : "",
      id: this.props.schedule ? this.props.schedule.id : "",
    };
  }

  updateSchedule = (e) => {
    // update
    axios
      .put(
        "http://127.0.0.1:8000/api/update_schedule/" + this.state.id,
        {
          data: {
            date: this.state.date,
            time: this.state.time,
            party_size: this.state.party,
          },
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.scheduleToggle(e, "", []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteSchedule = (e) => {
    // delete
    axios
      .delete("http://127.0.0.1:8000/api/delete_schedule/" + this.state.id, {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
      })
      .then((response) => {
        console.log(response);
        this.props.scheduleToggle(e, "", []);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <ModalFooter>
              {this.props.action === "add" ? (
                <Button color="primary" onClick={this.submitSchedule}>
                  Submit
                </Button>
              ) : (
                <>
                  <Button color="primary" onClick={this.updateSchedule}>
                    Update
                  </Button>{" "}
                  <Button color="danger" onClick={this.deleteSchedule}>
                    Delete
                  </Button>
                </>
              )}{" "}
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
