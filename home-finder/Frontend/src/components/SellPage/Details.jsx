import React from 'react';
import axios from 'axios';
import { Button, Row, Col, Input, Form,
    ModalBody, ModalHeader, ModalFooter,
    FormGroup, Label
}from 'reactstrap';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            home: this.props.home
        }
    }

    handleChange = (e) => {
        console.log(e.target)
        let tmp = this.state.home;
        tmp[e.target.name] = e.target.value;
        this.setState({
            home: tmp
        });
    }

    render() {
        return(
            <div>
                <ModalHeader toggle={this.props.editDetailToggle}>
                    Update Home Details
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleListSubmit}>
                        <FormGroup onChange={this.handleChange}>
                            <Label for="exampleText">Price</Label>
                            <Input 
                                type="text" 
                                name="cost"
                                value={this.state.home.cost}
                            />
                        </FormGroup>
                        <FormGroup onChange={this.handleChange}>
                            <Label>Address</Label>
                            <Input value={this.state.home.address} name="address"/>
                            <Row>
                                <Col>
                                    <Label>City</Label>
                                    <Input
                                        value={this.state.home.city}
                                        name="city"
                                    />
                                </Col>
                                <Col>
                                    <Label>State</Label>
                                    <Input
                                        value={this.state.home.state}
                                        name="address"
                                    />
                                </Col>
                                <Col>
                                    <Label>Zipcode</Label>
                                    <Input
                                        name="zip_code"
                                        value={this.state.home.zip_code}
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
                                value={this.state.home.description}
                            />
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary">Update</Button>{' '}
                            <Button color="danger" onClick={this.props.editDetailToggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>   
            </div>
        );
    }
}

export default Details;