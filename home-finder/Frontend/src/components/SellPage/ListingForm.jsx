import React from 'react';
import { Container, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, FormText, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ListingForm extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
            address: "",
            city: "",
            cost: "",
            state: "",
            zip_code: "",
            description: ""
         }
     }

     handleListSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log(e.target);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
            <Container>
                <h2>Sell Home</h2>
                <Form onSubmit={this.handleListSubmit}>
                    <FormGroup onChange={this.handleChange}>
                        <Label for="exampleText">Price</Label>
                        <Input 
                            type="text" 
                            name="cost"
                            value={this.state.cost}
                        />
                    </FormGroup>
                    <FormGroup onChange={this.handleChange}>
                        <Label>Address</Label>
                        <Input value={this.state.address} name="address"/>
                        <Row>
                            <Col>
                                <Label>City</Label>
                                <Input
                                    value={this.state.city}
                                    name="city"
                                />
                            </Col>
                            <Col>
                                <Label>State</Label>
                                <Input
                                    value={this.state.state}
                                    name="state"
                                />
                            </Col>
                            <Col>
                                <Label>Zipcode</Label>
                                <Input
                                    name="zip_code"
                                    value={this.state.zip_code}
                                />
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
                    <FormGroup onChange={this.handleChange}>
                        <Label for="exampleText">Description</Label>
                        <Input 
                            type="textarea" 
                            name="description"
                            value={this.state.description}
                        />
                    </FormGroup>
                    <Button color="primary" type="submit" action="submit">Submit</Button>{' '}
                    <Link className="btn btn-primary"  to="/sell">Go Back</Link>
                </Form>
            </Container>
        );
    }
} 