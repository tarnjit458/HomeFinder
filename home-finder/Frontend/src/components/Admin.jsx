import React from "react";
import {
  Container,
  Table,
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
} from "reactstrap";
import axios from "axios";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      manageModal: false,
      selectedUser: {},
      successAlert: false,
      errorAlert: false,
      msg: "",
      alertToggle: false,
    };
  }

  componentDidMount() {
    this.grabAllUsers();
  }

  grabAllUsers = () => {
    axios
      .get("http://100.24.18.12:8000/api/allUsers", {
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
  };

  manageToggle = () => {
    this.setState({
      manageModal: !this.state.manageModal,
    });
  };

  toggleLoginAlert = () => {
    this.setState({
      alertToggle: !this.state.alertToggle,
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
    axios
      .delete("http://100.24.18.12:8000/api/delete_user/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          user_id: this.state.selectedUser.id,
        },
      })
      .then((response) => {
        let msg = response.data.message.trim();
        let success = false;
        if (msg.toLowerCase().startsWith("success")) {
          success = true;
        }
        this.setState({
          msg: msg,
          errorAlert: !success,
          successAlert: success,
        });
        this.grabAllUsers();
        this.toggleLoginAlert();
        this.manageToggle();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          msg: "Unable to delete user.",
          errorAlert: true,
          successAlert: false,
        });
        this.toggleLoginAlert();
        this.manageToggle();
      });
  };

  render() {
    return (
      <Container>
        <div className="row justify-content-center">
          <h2>Administrator Dashboard</h2>
        </div>
        <Alert
          color={this.state.errorAlert ? "danger" : "success"}
          isOpen={this.state.alertToggle}
          toggle={this.toggleLoginAlert}
        >
          {this.state.msg}
        </Alert>
        <h5 className="row justify-content-center">All Active Users</h5>
        <Table dark bordered>
          <thead>
            <tr>
              <td>User-ID</td>
              <td>Role</td>
              <td>Email</td>
              <td>Date Joined</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              return (
                <tr onClick={(e) => this.onRowClick(e, user)}>
                  <td>{user.id}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
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
