import React from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Row,
  Alert,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    role: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    password: "",
    password2: "",
    alertToggle1: false,
    alertToggle2: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleAlert1 = () => {
    this.setState({
      alertToggle1: !this.state.alertToggle1,
    });
  };

  toggleAlert2 = () => {
    this.setState({
      alertToggle2: !this.state.alertToggle2,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/user_register/", {
        role: this.state.role,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zip_code: this.state.zip_code,
        phone: this.state.phone,
        password: this.state.password,
        password2: this.state.password2,
      })
      .then((response) => {
        console.log(response);
        if (
          response.data.email[0] ===
          "user with this email address already exists."
        ) {
          this.toggleAlert1();
        } else {
          this.props.history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        this.toggleAlert2();
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Home Finder</h1>
        <h2>Register</h2>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Container className="login-border">
            <Col className="font-weight-bold">
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  name="role"
                  placeholder="Role"
                  value={this.state.role}
                  onChange={this.handleChange}
                >
                  <option value="">Choose your role</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Realtor">Realtor</option>
                  <option value="Landlord">Landlord</option>
                  <option value="User">User</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input
                  type="first_name"
                  name="first_name"
                  placeholder="First Name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input
                  type="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="address"
                  name="address"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="city"
                  name="city"
                  placeholder="City"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">State</Label>
                <Input
                  type="state"
                  name="state"
                  placeholder="State"
                  value={this.state.state}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="zip_code">Zip Code</Label>
                <Input
                  type="zip_code"
                  name="zip_code"
                  placeholder="Zip Code"
                  value={this.state.zip_code}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password2">Re-enter Password</Label>
                <Input
                  type="password"
                  name="password2"
                  placeholder="Password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Register
              </Button>{" "}
              <Link className="btn btn-danger" to="/login">
                Cancel
              </Link>
            </Col>
          </Container>
        </Form>
        <Row className="justify-content-center">
          <Col md="4">
            <Alert
              color="danger"
              isOpen={this.state.alertToggle1}
              toggle={this.toggleAlert1}
            >
              This email is already registered!
            </Alert>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="4">
            <Alert
              color="danger"
              isOpen={this.state.alertToggle2}
              toggle={this.toggleAlert2}
            >
              Invalid register information!
            </Alert>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
