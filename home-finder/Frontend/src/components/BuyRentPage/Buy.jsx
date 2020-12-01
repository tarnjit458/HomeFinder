import React from "react";
import BuySearch from "./BuySearch.jsx";
import Favorite from "../FavoriteButtons/Favorite.jsx";
import axios from "axios";

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
      employment: "",
      credit_score: "",
      offer: "",
      totalSchedules: [],
      houseApplications: [],
      homesOffered: [],
      usersCurrentOffers: [],
    };
  }

  componentDidMount() {
    this.getHouseOfferApplications();
  }

  myCallback = (dataFromChild) => {
    this.setState({ filteredHomes: dataFromChild });
  };

  manageHouseToggle = (id) => {
    this.setState({
      manageHouseModal: !this.state.manageHouseModal,
      selectedHome: id,
    });
    this.getSchedules(id);
    this.getHouseApplications(id);
    this.getUserOfferApplications(id);
    this.getHouseOfferApplications();
  };

  getSchedules = (id) => {
    axios
      .get("http://100.24.18.12:8000/api/display_schedule/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: id,
        },
      })
      .then((response) => {
        this.setState({
          totalSchedules: response.data.Schedule,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getHouseApplications = (id) => {
    axios
      .get("http://100.24.18.12:8000/api/display_application/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: id,
        },
      })
      .then((response) => {
        this.setState({
          houseApplications: response.data.application,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getHouseOfferApplications = () => {
    axios
      .get("http://100.24.18.12:8000/api/show_application_for_user/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
      })
      .then((response) => {
        this.setState({
          homesOffered: response.data.application,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserOfferApplications = (id) => {
    axios
      .get("http://100.24.18.12:8000/api/display_application_by_user/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          house_id: id,
        },
      })
      .then((response) => {
        this.setState({
          usersCurrentOffers: response.data.application,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitOffer = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://100.24.18.12:8000/api/send_application/",
        {
          house_id: this.state.selectedHome,
          employment: this.state.employment,
          credit_score: this.state.credit_score,
          offer: this.state.offer,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("user"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      employment: "",
      credit_score: "",
      offer: "",
    });
    this.getHouseOfferApplications();
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
        <div key={home.id} style={{ textAlign: "center" }}>
          <Favorite id={home.id} />
          <ModalHeader toggle={this.manageHouseToggle}>
            {home.address}, {home.city} {home.state} {home.zip_code}
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Price: ${home.cost}</td>
                </tr>
                <tr>
                  <td>Description: {home.description}</td>
                </tr>
              </tbody>
            </Table>
            <Table bordered>
              <tbody>
                <tr>
                  <td>{home.bedrooms} bd</td>
                  <td>{home.bathrooms} ba</td>
                  <td>{home.sqft} sqft</td>
                </tr>
              </tbody>
            </Table>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Built {home.year_built}</td>
                </tr>
                <tr>
                  <td>{home.flooring} flooring</td>
                </tr>
                <tr>
                  <td>{home.parking} parking</td>
                </tr>
              </tbody>
            </Table>

            <h3>Upcoming Open Houses</h3>
            <Table bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th># of Visitors</th>
                </tr>
              </thead>
              <tbody>
                {this.state.totalSchedules.map((r) => {
                  return (
                    <tr>
                      <td>{r["date"]}</td>
                      <td>{r["time"]}</td>
                      <td>{r["party_size"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <h3>Your Offers</h3>
            <Table borderless={false}>
              <thead>
                <tr>
                  <th>Offer($)</th>
                  <th>Credit Score</th>
                  <th>Employment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.usersCurrentOffers.map((r) => {
                  return (
                    <tr>
                      <td>{r["offer"]}</td>
                      <td>{r["credit_score"]}</td>
                      <td>{r["employment"]}</td>
                      <td>{r["status"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <h3>Current Offers</h3>
            <Table borderless={false}>
              <thead>
                <tr>
                  <th>Offer($)</th>
                  <th>Credit Score</th>
                  <th>Employment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.houseApplications.map((r) => {
                  return (
                    <tr>
                      <td>{r["offer"]}</td>
                      <td>{r["credit_score"]}</td>
                      <td>{r["employment"]}</td>
                      <td>{r["status"]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Form onSubmit={this.handleSubmitOffer}>
              <FormGroup row>
                <Col>
                  <Label for="offer">Enter your current offer:</Label>
                </Col>
                <Col>
                  <Input
                    type="text"
                    name="employment"
                    placeholder="Employment"
                    value={this.state.employment}
                    onChange={this.handleChange}
                  />
                  <Input
                    type="text"
                    name="credit_score"
                    placeholder="Credit Score"
                    value={this.state.credit_score}
                    onChange={this.handleChange}
                  />
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
          <BuySearch
            callbackFromParent={this.myCallback}
            homesOffered={this.state.homesOffered}
          />
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
