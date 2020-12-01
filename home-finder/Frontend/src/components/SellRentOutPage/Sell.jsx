import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  Input,
  Form,
  Modal,
  Badge,
  Container,
} from "reactstrap";
import Manage from "./Manage.jsx";

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      list_toggle: false,
      manageHouseModal: false,
      inspectAppModal: false,
      userHouses: [],
      filterOption: "all",
      selectedHouse: {},
      selectedHouseSchedule: [],
    };
  }

  componentDidMount() {
    // call backend to retrieve current user's listing
    this.getUserListing();
  }

  getUserListing = () => {
    axios
      .get("http://100.24.18.12:8000/api/display_buy_by_user", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
        params: {
          for_sale: "True",
          owner_id: localStorage.getItem("user_id"),
        },
      })
      .then((response) => {
        console.log(response);
        let tmp = response.data.house.map((house) => {
          house.hide = false;
          return house;
        });
        console.log(tmp);
        this.setState({
          userHouses: tmp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchHomes = (e) => {
    console.log("on sale");
    e.preventDefault();
    let filter = this.state.filterOption;
    let input = this.state.currentInput.toLowerCase().trim();
    let tmp = this.state.userHouses.map((house) => {
      if (
        filter === "all" ||
        (filter === "address" &&
          house.address.toLowerCase().startsWith(input)) ||
        (filter === "city" && house.city.toLowerCase().startsWith(input)) ||
        (filter === "state" && house.state.toLowerCase().startsWith(input)) ||
        (filter === "zip_code" && house.zip_code.startsWith(input)) ||
        (filter === "sqft_g" && Number(house.sqft) >= Number(input)) ||
        (filter === "sqft_l" && Number(house.sqft) <= Number(input)) ||
        (filter === "year_built_g" &&
          Number(house.year_built) >= Number(input)) ||
        (filter === "year_built_l" &&
          Number(house.year_built) <= Number(input)) ||
        (filter === "bedrooms" && house.bedrooms.startsWith(input)) ||
        (filter === "bathrooms" && house.bathrooms.startsWith(input)) ||
        (filter === "flooring" &&
          house.flooring.toLowerCase().startsWith(input)) ||
        (filter === "parking" && house.parking.toLowerCase().startsWith(input))
      ) {
        house.hide = false;
      } else {
        house.hide = true;
      }
      return house;
    });
    this.setState({
      userHouses: tmp,
    });
  };

  manageHouseToggle = (e, house) => {
    if (house !== null || house !== undefined && Object.keys(house).length === 0) {
      this.getUserListing();
    }
    this.setState({
      manageHouseModal: !this.state.manageHouseModal,
      selectedHouse: house ? house : {},
    });
  };

  handleRowClick = (e, r) => {
    // handle row click for application list
    console.log(e.target, r);
    this.setState({
      inspectAppModal: !this.state.inspectAppModal,
    });
  };

  handleChange = (e) => {
    this.setState({
      currentInput: e.target.value,
    });
  };
  handleFilterChange = (e) => {
    this.setState({
      filterOption: e.target.value,
    });
  };

  inspectAppToggle = () => {
    this.setState({
      inspectAppModal: !this.state.inspectAppModal,
    });
  };

  render() {
    const justifySearch = {
      flex: "none",
      padding: "32px 21px",
    };
    return (
      <Container className="pb-4">
        <div className="row justify-content-center">
          <h2>Selling Dashboard</h2>
        </div>

        <Form className="pb-4" onSubmit={this.searchHomes}>
          <Row className="justify-content-center" style={justifySearch}>
            <Col md="9">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Enter a address, zip code or city..."
                onChange={this.handleChange}
                value={this.state.currentInput}
                aria-label="Search"
              />
            </Col>
            <Col md="2">
              <Input
                type="select"
                name="filterOption"
                value={this.state.filterOption}
                onChange={this.handleFilterChange}
              >
                <option value="all">Select a Filter</option>
                <option value="address">Street Address</option>
                <option value="city">City</option>
                <option value="state">State</option>
                <option value="zip_code">Zip Code</option>
                <option value="sqft_g">Square footage (Greater Than)</option>
                <option value="sqft_l">Square footage (Less Than)</option>
                <option value="year_built_g">Year Built (Greater Than)</option>
                <option value="year_built_l">Year Built (Less Than)</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="bathrooms">Bathrooms</option>
                <option value="flooring">
                  Flooring (Tile, Wooden, Carpet)
                </option>
                <option value="parking">Parking (Open, Closed)</option>
              </Input>
            </Col>
            <Col md="1">
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </Col>
          </Row>
        </Form>

        <Row>
          <Col md="4">
            <Card>
              <CardBody>
                <h5 className="card-title">Sell your house now!</h5>
                <img
                  className="card-img-top pb-2"
                  src="/For-sale-sign.jpg"
                  alt="Card image cap"
                />
                <Link
                  to={{ pathname: "/list_form", state: { isRental: false } }}
                  className="btn btn-primary"
                >
                  Start Listing
                </Link>
              </CardBody>
            </Card>
          </Col>
          {this.state.userHouses
            .filter((house) => {
              if (house.hide) {
                return false;
              }
              return true;
            })
            .map((house) => {
              return (
                <Col md="4">
                  <Card>
                    <CardBody>
                      <img
                        className="card-img-top"
                        src={house.image}
                        alt="Card image cap"
                      />
                      <Row className="pt-2">
                        <Col md="8">
                          <CardTitle tag="h5">
                            {house.address}, {house.city}, {house.state},{" "}
                            {house.zip_code}
                          </CardTitle>
                        </Col>
                        <Col>
                          <Badge color={house.for_sale ? "info": "success"}>
                            {house.for_sale ? "On Market" : "Sold"}
                          </Badge>
                        </Col>
                      </Row>
                      <Button
                        onClick={(e) => this.manageHouseToggle(e, house)}
                        color="primary"
                      >
                        Manage
                      </Button>{" "}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>

        <Modal
          isOpen={this.state.manageHouseModal}
          toggle={this.manageHouseToggle}
        >
          <Manage
            home={this.state.selectedHouse}
            manageHouseToggle={this.manageHouseToggle}
            isRental={false}
          />
        </Modal>
      </Container>
    );
  }
}

export default Sell;
