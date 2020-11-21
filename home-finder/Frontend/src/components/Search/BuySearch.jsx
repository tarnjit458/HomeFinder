import React from "react";
import { Container, Input } from "reactstrap";
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
    };
  }

  async componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/buy_search?search=", {
        headers: { Authorization: "Token " + localStorage.getItem("user") },
      })
      .then((response) => {
        console.log(response);
        this.setState({ homes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHomes = () => {
    this.state.filteredHomes = this.state.homes.filter((home) => {
      if (this.state.filterOption === "all") {
        return home;
      } else if (this.state.filterOption === "zip_code") {
        if (
          home.zip_code
            .toLowerCase()
            .startsWith(this.state.currentInput.toLowerCase())
        ) {
          return home;
        }
      } else if (this.state.filterOption === "address") {
        if (
          home.address
            .toLowerCase()
            .startsWith(this.state.currentInput.toLowerCase())
        ) {
          return home;
        }
      } else if (this.state.filterOption === "city") {
        if (
          home.city
            .toLowerCase()
            .startsWith(this.state.currentInput.toLowerCase())
        ) {
          return home;
        }
      }
    });
    this.setState({ search: true });
    console.log(this.state);
    this.props.callbackFromParent(this.state.filteredHomes);
  };

  render() {
    const justifySearch = {
      flex: "none",
      padding: "32px 21px",
    };

    return (
      <Container>
        <div className="row justify-content-end" style={justifySearch}>
          <div className="col-5">
            <Input
              type="text"
              name="currentInput"
              placeholder="Enter an address, zip code or city..."
              value={this.state.currentInput}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Input
              type="select"
              name="filterOption"
              value={this.state.filterOption}
              onChange={this.handleChange}
            >
              <option value="all">Select a Filter</option>
              <option value="address">Street Address</option>
              <option value="zip_code">Zip Code</option>
              <option value="city">City</option>
            </Input>
          </div>
          <div className="col-4">
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit"
              onClick={this.filterHomes}
            >
              Search
            </button>
          </div>
        </div>
      </Container>
    );
  }
}

export default BuySearch;
