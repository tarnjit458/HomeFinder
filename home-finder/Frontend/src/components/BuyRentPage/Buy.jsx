import React from "react";
import BuySearch from "./BuySearch.jsx";

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  Label,
  Input,
  Form,
  FormGroup,
  CardDeck,
  Container,
} from "reactstrap";

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredHomes: [],
      manageHouseModal: false,
      selectedHome: "",
      offer: "",
    };
  }
  myCallback = (dataFromChild) => {
    this.setState({ filteredHomes: dataFromChild });
  };

  manageHouseToggle = (id) => {
    this.setState({
      manageHouseModal: !this.state.manageHouseModal,
      selectedHome: id,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.offer);
    // axios call
    this.manageHouseToggle([]);
  };

  render() {
    const homesJsx = this.state.filteredHomes.map((home) => {
      return (
        <div key={home.id}>
          <Col md="4">
            <CardDeck style={{ width: "22rem" }}>
              <Card>
                <CardBody>
                  <img className="card-img-top" src={home.image} alt="failed" />
                  <Row className="pt-2">
                    <Col md="12">
                      <CardTitle tag="h5">
                        {`${home.address}, ` +
                          `${home.city}, ` +
                          `${home.state} ` +
                          `${home.zip_code}`}
                      </CardTitle>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Button
                      onClick={() => {
                        this.manageHouseToggle(home.id);
                      }}
                      color="primary"
                    >
                      Buy Home
                    </Button>{" "}
                  </Row>
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
        </div>
      );
    });

    const modal = this.state.filteredHomes.map((home) => {
      return this.state.selectedHome === home.id ? (
        <div key={home.id}>
          <ModalHeader toggle={this.manageHouseToggle}>
            {home.address}, {home.city} {home.state} {home.zip_code}
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Pice:</td>
                  <td>${home.cost}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{home.description}</td>
                </tr>
              </tbody>
            </Table>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Single Family House</td>
                  <td>3 bd</td>
                  <td>2 ba</td>
                  <td>1800 sqft</td>
                </tr>
              </tbody>
            </Table>

            <h3>Current Offers</h3>
            <Table borderless={false}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Offer($)</th>
                  <th>Credit Score</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Col>
                  <Label for="offer">Enter your current offer:</Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name="offer"
                    placeholder="Offer($)"
                    value={this.state.offer}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col>
                  <Button color="primary" type="submit">
                    Submit Offer
                  </Button>
                </Col>
              </FormGroup>
            </Form>
            <Button color="danger" onClick={this.manageHouseToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </div>
      ) : (
        /* do nothing */
        <></>
      );
    });

    return (
      <Container className="pb-4">
        <div className="row justify-content-center">
          <h2>Buying Dashboard</h2>
        </div>

        <Row className="justify-content-center">
          <BuySearch callbackFromParent={this.myCallback} />
        </Row>

        <Row className="justify-content-center">{homesJsx}</Row>

        <Modal
          isOpen={this.state.manageHouseModal}
          toggle={this.manageHouseToggle}
        >
          {modal}
        </Modal>
      </Container>
    );
  }
}

export default Buy;
