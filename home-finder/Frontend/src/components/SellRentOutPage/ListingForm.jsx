import React from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      cost: "",
      state: "",
      zip_code: "",
      description: "",
      flooring: "",
      parking: "",
      image: "",
      sqft: "",
      year_built: "",
      bedrooms: "",
      bathrooms: "",
    };
  }

  handleListSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/register_house/",
        {
          address: this.state.address,
          city: this.state.city,
          state: this.state.state,
          zip_code: this.state.zip_code,
          cost: this.state.cost,
          description: this.state.description,
          for_sale: this.props.location.state.isRental ? false : true,
          on_loan: this.props.location.state.isRental,
          image: this.state.image,
          flooring: this.state.flooring,
          parking: this.state.parking,
          owner: localStorage.getItem("user_id"),
          sqft: this.state.sqft,
          bedrooms: this.state.bedrooms,
          bathrooms: this.state.bathrooms,
          year_built: this.state.year_built,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        if (this.props.location.state.isRental) {
          this.props.history.push("/rent-out");
        } else {
          this.props.history.push("/sell");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Container>
        <h2>
          {this.props.location.state.isRental ? "List Rental" : "Sell Home"}
        </h2>
        <Form onSubmit={this.handleListSubmit} onChange={this.handleChange}>
          <FormGroup>
            <Label for="exampleText">
              {this.props.location.state.isRental ? "Price per month" : "Price"}
            </Label>
            <Input type="text" name="cost" value={this.state.cost} />
          </FormGroup>
          <FormGroup>
            <Label>Address</Label>
            <Input value={this.state.address} name="address" />
            <Row>
              <Col>
                <Label>City</Label>
                <Input value={this.state.city} name="city" />
              </Col>
              <Col>
                <Label>State</Label>
                <Input value={this.state.state} name="state" />
              </Col>
              <Col>
                <Label>Zipcode</Label>
                <Input name="zip_code" value={this.state.zip_code} />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Label>Sq Ft</Label>
                <Input value={this.state.sqft} name="sqft" />
              </Col>
              <Col>
                <Label>Bedrooms</Label>
                <Input value={this.state.bedrooms} name="bedrooms" />
              </Col>
              <Col>
                <Label>Bathrooms</Label>
                <Input value={this.state.bathrooms} name="bathrooms" />
              </Col>
              <Col>
                <Label for="flooring">Floor Type</Label>
                <Input
                  value={this.state.flooring}
                  type="select"
                  name="flooring"
                >
                  <option value="">Select Floor Option</option>
                  <option value="tile">Tile</option>
                  <option value="wooden">Wooden</option>
                  <option value="carpet">Carpet</option>
                </Input>
              </Col>
              <Col>
                <Label for="parking">Parking Type</Label>
                <Input value={this.state.parking} type="select" name="parking">
                  <option value="">Select Parking Option</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Label>Year Built</Label>
                <Input value={this.state.year_built} name="year_built" />
              </Col>
              <Col>
                <Label>Image Url</Label>
                <Input value={this.state.image} name="image" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup onChange={this.handleChange}>
            <Label for="exampleText">Description</Label>
            <Input
              type="textarea"
              name="description"
              value={this.state.description}
            />
          </FormGroup>
          <Button color="primary" type="submit" action="submit">
            Submit
          </Button>{" "}
          <Link
            className="btn btn-primary"
            to={this.props.location.state.isRental ? "/rent-out" : "/sell"}
          >
            Go Back
          </Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ListingForm);
