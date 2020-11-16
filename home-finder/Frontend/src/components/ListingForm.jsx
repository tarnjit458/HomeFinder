import React from 'react';
import { Container, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, FormText, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ListingForm extends React.Component {
     constructor(props) {
         super(props);
     }

     handleListSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log(e.target);
    }

    render() {
        return(
            <Container>
                <h2>Sell Home</h2>
                <Form onSubmit={this.handleListSubmit}>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input name="address"/>
                        <Row>
                            <Col>
                                <Label>City</Label>
                                <Input name="city"/>
                            </Col>
                            <Col>
                                <Label>State</Label>
                                <Input name="address"/>
                            </Col>
                            <Col>
                                <Label>Zipcode</Label>
                                <Input name="address"/>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label for="house_type">House Type</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="single">Single Family</option>
                            <option value="multi">MultiFamily</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Selling or renting?</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option value="rental">Rental</option>
                            <option value="selling">Selling</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Row>
                        <Col md="1">
                            <Button color="primary" type="submit" action="submit">Submit</Button>
                        </Col>
                        <Col md="2">
                            <Link className="btn btn-primary"  to="/rent-sell">Go Back</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
} 