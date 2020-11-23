import React from 'react';
import { Container, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, FormText, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
/*
	address = models.CharField('address', max_length=100)
	city = models.CharField('city', max_length=100)
	state = models.CharField('state', max_length=100)
	zip_code = models.CharField('zip code', max_length=50)
	cost = models.IntegerField('cost', default=0)
	description = models.TextField('description')
	for_sale = models.BooleanField(default=False)
	owner = models.ForeignKey(User, verbose_name='owner', on_delete=models.CASCADE)
	registered_at = models.DateTimeField('degistered date', default=timezone.now)
	sold = models.BooleanField(default=False)
	on_loan = models.BooleanField(default=False)
	image = models.CharField('image url', max_length=500)
*/
     handleListSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        console.log(e.target);
        axios.post('http://127.0.0.1:8000/api/register_house/', {
            address: this.state.address,
            city: this.state.city,
            zip_code: this.state.zip_code,
            cost: this.state.cost,
            description: this.state.description,
            for_sale: this.props.isRental ? false : true,
            for_loan: this.props.isRental,
            image: ""
        },{
            headers: {
                Authorization: "Token " + localStorage.getItem("user")
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
            <Container>
                <h2>{this.props.isRental ? "List Rental" : "Sell Home"}</h2>
                <Form onSubmit={this.handleListSubmit}>
                    <FormGroup onChange={this.handleChange}>
                        <Label for="exampleText">{this.props.isRental ? "Price per month" : "Price"}</Label>
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