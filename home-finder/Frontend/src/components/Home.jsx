import React from "react";
import PropertyCard from "./PropertyCard.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      role: localStorage.getItem("role"),
    };
  }

  handleChange = (e) => {
    this.setState({ currentInput: e.target.value });
  };

  render() {
    const justifyCards = {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      flex: "none",
      padding: "32px 21px",
    };

    return (
      <div>
        <div className="row justify-content-center">
          <h2>We'll find your next home</h2>
        </div>

        <div className="row card-deck" style={justifyCards}>
          <PropertyCard
            title="Buy a House!"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            image_src="/960x0.jpg"
            button="Search Homes"
            button_src="/buy"
          />
          <PropertyCard
            title="Sell your house!"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            image_src="/For-sale-sign.jpg"
            button="Make Money"
            button_src="/sell"
          />
          {this.state.role !== "realtor" ? (
            <PropertyCard
              title="Find a place to rent!"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              image_src="/cover-12.jpg"
              button="Find Rentals"
              button_src="/rent"
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
