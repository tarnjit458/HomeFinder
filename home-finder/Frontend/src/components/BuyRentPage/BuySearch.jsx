import React from "react";
import { Col, Container, Form, Input, Row } from "reactstrap";
import axios from "axios";

class BuySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      filteredHomes: [],
      currentInput: "",
      filterOption: "all",
      search: false,
      favoritedHomes: [],
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    axios
      .get("http://100.24.18.12:8000/api/buy_search?search=", {
        headers: { Authorization: "Token " + localStorage.getItem("user") },
      })
      .then((response) => {
        this.setState({ homes: response.data });
        this.props.callbackFromParent(this.state.homes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getFavorites = () => {
    axios
      .get("http://100.24.18.12:8000/api/show_favorite_list/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("user"),
        },
      })
      .then((response) => {
        this.state.favoritedHomes = response.data.favorite.filter((f) => {
          if (f.house.on_loan === false) {
            return f.house;
          }
        });
        this.state.favoritedHomes = this.state.favoritedHomes.map((f) => {
          return f.house;
        });
        this.props.callbackFromParent(this.state.favoritedHomes);
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

  filterHomes = (e) => {
    e.preventDefault();

    let filter = this.state.filterOption;
    let input = this.state.currentInput.toLowerCase().trim();

    if (filter === "favorites") {
      this.getFavorites();
    } else {
      this.state.filteredHomes = this.state.homes.filter((home) => {
        if (
          filter === "all" ||
          (filter === "your_offers" &&
            this.props.homesOffered
              .map((r) => {
                return r.house.id;
              })
              .includes(home.id)) ||
          (filter === "address" &&
            home.address.toLowerCase().startsWith(input)) ||
          (filter === "city" && home.city.toLowerCase().startsWith(input)) ||
          (filter === "state" && home.state.toLowerCase().startsWith(input)) ||
          (filter === "zip_code" && home.zip_code.startsWith(input)) ||
          (filter === "sqft_g" && Number(home.sqft) >= Number(input)) ||
          (filter === "sqft_l" && Number(home.sqft) <= Number(input)) ||
          (filter === "year_built_g" &&
            Number(home.year_built) >= Number(input)) ||
          (filter === "year_built_l" &&
            Number(home.year_built) <= Number(input)) ||
          (filter === "bedrooms" && home.bedrooms.startsWith(input)) ||
          (filter === "bathrooms" && home.bathrooms.startsWith(input)) ||
          (filter === "flooring" &&
            home.flooring.toLowerCase().startsWith(input)) ||
          (filter === "parking" && home.parking.toLowerCase().startsWith(input))
        ) {
          return home;
        }
      });
    }
    this.setState({ search: true });
    this.props.callbackFromParent(this.state.filteredHomes);
  };

  render() {
    const justifySearch = {
      flex: "none",
      padding: "32px 21px",
    };

    return (
      <Container>
        <Form className="pb-4" onSubmit={this.filterHomes}>
          <Row className="justify-content-center" style={justifySearch}>
            <Col md="9">
              <Input
                type="text"
                name="currentInput"
                placeholder="Enter an address, zip code or city..."
                value={this.state.currentInput}
                onChange={this.handleChange}
              />
            </Col>
            <Col md="2">
              <Input
                type="select"
                name="filterOption"
                value={this.state.filterOption}
                onChange={this.handleChange}
              >
                <option value="all">Select a Filter</option>
                <option value="favorites">Your Favorites</option>
                <option value="your_offers">Your Offered Homes</option>
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
      </Container>
    );
  }
}

export default BuySearch;
