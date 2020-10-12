import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label, Row, Col, Container } from 'reactstrap'

class Login extends Component {
    render() { 
        return (
            <div>
                <h1>Home Finder</h1>
                <Form className="login-form">
                    <Container className="login-border">
                        <Col className="font-weight-bold">
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" placeholder="Username"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="text" name="password" placeholder="Password"/>
                            </FormGroup>
                            <Button>Login</Button>{' '}
                            <Button>Register</Button>
                        </Col>
                    </Container>
                </Form>
            </div>
        );
    }
}
 
export default Login;