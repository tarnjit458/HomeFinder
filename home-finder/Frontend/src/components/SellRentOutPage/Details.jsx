import React from "react";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  Input,
  Form,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: this.props.home,
      address: this.props.home.address,
      city: this.props.home.city,
      cost: this.props.home.cost,
      state: this.props.home.state,
      zip_code: this.props.home.zip_code,
      description: this.props.home.description,
      image: this.props.home.image,
    };
  }

  handleChange = (e) => {
    console.log(e.target);
    let tmp = this.state.home;
    tmp[e.target.name] = e.target.value;
    this.setState({
      home: tmp,
    });
  };

  updateDetail = () => {
    axios
      .put(
        "http://100.24.18.12:8000/api/edit_house/" + this.state.home.id,
        {
          data: {
            address: this.state.home.address,
            city: this.state.home.city,
            cost: this.state.home.cost,
            state: this.state.home.state,
            zip_code: this.state.home.zip_code,
            description: this.state.home.description,
            image: this.state.home.image,
            owner: localStorage.getItem("user_id"),
            for_sale: this.state.home.for_sale,
            sqft: this.props.home.sqft,
            flooring: this.props.home.flooring,
            parking: this.props.home.parking,
            bedrooms: this.props.home.bedrooms,
            bathrooms: this.props.home.bathrooms,
            year_built: this.props.home.year_built,
          },
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.editDetailToggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <ModalHeader toggle={this.props.editDetailToggle}>
          Update Home Details
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleListSubmit} onChange={this.handleChange}>
            <FormGroup>
              <Label for="exampleText">Price</Label>
              <Input type="text" name="cost" value={this.state.home.cost} />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input value={this.state.home.address} name="address" />
              <Row>
                <Col>
                  <Label>City</Label>
                  <Input value={this.state.home.city} name="city" />
                </Col>
                <Col>
                  <Label>State</Label>
                  <Input value={this.state.home.state} name="state" />
                </Col>
                <Col>
                  <Label>Zipcode</Label>
                  <Input name="zip_code" value={this.state.home.zip_code} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label>Sq Ft</Label>
                  <Input value={this.state.home.sqft} name="sqft" />
                </Col>
                <Col>
                  <Label>Bedrooms</Label>
                  <Input value={this.state.home.bedrooms} name="bedrooms" />
                </Col>
                <Col>
                  <Label>Bathrooms</Label>
                  <Input value={this.state.home.bathrooms} name="bathrooms" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Label for="flooring">Floor Type</Label>
                  <Input
                    value={this.state.home.flooring}
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
                  <Input
                    value={this.state.home.parking}
                    type="select"
                    name="parking"
                  >
                    <option value="">Select Parking Option</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </Input>
                </Col>
                <Col>
                  <Label>Year Built</Label>
                  <Input value={this.state.home.year_built} name="year_built" />
                </Col>
                <Col>
                  <Label>Image Url</Label>
                  <Input value={this.state.home.image} name="image" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Description</Label>
              <Input
                type="textarea"
                name="description"
                value={this.state.home.description}
              />
            </FormGroup>
            <ModalFooter>
              <Button color="primary" onClick={this.updateDetail}>
                Update
              </Button>{" "}
              <Button color="danger" onClick={this.props.editDetailToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </div>
    );
  }
}

export default Details;
