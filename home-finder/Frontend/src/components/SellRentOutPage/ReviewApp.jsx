import React from "react";
import axios from "axios";
import {
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  Badge,
} from "reactstrap";

class ReviewApp extends React.Component {
  constructor(props) {
    super(props);
  }

  approveApp = (e) => {
    axios
      .post("http://127.0.0.1:8000/api/approve_application/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        data: {
          application_id: this.props.offer.id,
        },
      })
      .then((response) => {
        console.log(response);
        this.props.inspectAppToggle(e, {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  rejectApp = (e) => {
    axios
      .post("http://127.0.0.1:8000/api/reject_application/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        data: {
          application_id: this.props.offer.id,
        },
      })
      .then((response) => {
        console.log(response);
        this.props.inspectAppToggle(e, {});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <ModalHeader toggle={this.props.inspectAppToggle}>
          {this.props.offer.user.first_name} {this.props.offer.user.last_name}'s
          Offer
        </ModalHeader>
        <ModalBody>
          <Table>
            <tbody>
              <tr>
                <td>{this.props.isRental ? "Salary:" : "Price:"}</td>
                <td>${this.props.offer.offer}</td>
                <td></td>
              </tr>
              <tr>
                <td>Credit Score:</td>
                <td>{this.props.offer.credit_score}</td>
                <td>Employment:</td>
                <td>{this.props.offer.employment}</td>
              </tr>
            </tbody>
          </Table>
          <Button color="primary" onClick={this.approveApp}>
            Approve
          </Button>{" "}
          <Button color="danger" onClick={this.rejectApp}>
            Reject
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.inspectAppToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

export default ReviewApp;
