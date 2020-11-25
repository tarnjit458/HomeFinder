import React from "react";
import {
  Container,
  Table,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import axios from "axios";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      manageModal: false,
      selectedUser: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/allUsers", {
        Authorization: "Token " + localStorage.getItem("user"),
      })
      .then((response) => {
        console.log(response);
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  manageToggle = () => {
    this.setState({
      manageModal: !this.state.manageModal,
    });
  };

  onRowClick = (e, row) => {
    // row click
    this.manageToggle();
    this.setState({
      selectedUser: row,
    });
  };

  removeUser = () => {
    // delete selected user
    this.manageToggle();
  };

  render() {
    return (
      <Container>
        <h5>All Active Users</h5>
        <Table>
          <thead>
            <tr>
              <td>Userid</td>
              <td>Name</td>
              <td>Date Joined</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr onClick={(e) => this.onRowClick(e, user)}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.date_joined}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal isOpen={this.state.manageModal} toggle={this.manageToggle}>
          <ModalHeader toggle={this.manageToggle}>
            <h5>User {this.state.selectedUser.id}</h5>
          </ModalHeader>
          <ModalBody>
            <Table borderless={true}>
              <tbody>
                {Object.entries(this.state.selectedUser).map(([key, value]) => {
                  return (
                    <div>
                      <tr>
                        <td>{key}:</td>
                        <td>{value}</td>
                      </tr>
                    </div>
                  );
                })}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.removeUser}>
              Remove
            </Button>{" "}
            <Button color="primary" onClick={this.manageToggle}>
              Back
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Admin;
