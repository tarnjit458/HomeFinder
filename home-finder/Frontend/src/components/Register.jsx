import React from "react";
import axios from 'axios';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
} from "reactstrap";
import {withRouter, Link} from 'react-router-dom';

class Login extends React.Component {
  state = {
    name: "",
    email: "",
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://127.0.0.1:8000/api/user_register', {
      'email': this.state.email,
      'password': this.state.password,
      "password2": this.state.password
    })
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    this.props.history.push('/login');
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
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
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
              <Button color="primary" type="submit">Register</Button>{' '}
              <Link className="btn btn-danger" to="/login">Cancel</Link>
            </Col>
          </Container>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
