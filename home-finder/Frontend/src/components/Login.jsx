import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
  Alert,
  Row
} from "reactstrap";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      alertToggle: false
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleLoginAlert = () => {
    this.setState({
      alertToggle: !this.state.alertToggle
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios.post('http://127.0.0.1:8000/api/login', {
      'username': this.state.username,
      'password': this.state.password
    }).then((response) => {
      localStorage.setItem('user', response.data.token);
      this.props.history.push("/");
    }).catch((error) => {
      // validation failed
      console.log(error);
      this.toggleLoginAlert();
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Home Finder</h1>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Container className="login-border">
            <Col className="font-weight-bold">
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
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
              <Button type="submit">Login</Button>{" "}
              <Link to="./register">
                <Button>Register</Button>
              </Link>
            </Col>
          </Container>
        </Form>
        <Row className="justify-content-center">
          <Col md="4">
        <Alert color="danger" isOpen={this.state.alertToggle} toggle={this.toggleLoginAlert}>
                Incorrect login information!
        </Alert>
        </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Login);
