import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Container,
} from "reactstrap";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    // if validation passes
    localStorage.setItem('user', 'true');
    this.props.history.push("/");
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
              <Link to="./Register">
                <Button>Register</Button>
              </Link>
            </Col>
          </Container>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
