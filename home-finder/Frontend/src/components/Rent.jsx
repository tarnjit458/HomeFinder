import React from "react";
import Search from "./Search.jsx";

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  CardDeck,
} from "reactstrap";

class Rent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredHomes: [],
    };
  }
  myCallback = (dataFromChild) => {
    this.setState({ filteredHomes: dataFromChild });
  };

  render() {
    const homesJsx = this.state.filteredHomes.map((home) => {
      return (
        <div key={home.id}>
          <Col md="8">
            <CardDeck style={{ width: "20rem" }}>
              <Card>
                <CardBody>
                  <img
                    className="card-img-top"
                    src={`${home.image}`}
                    alt="failed"
                  />
                  <CardTitle tag="h5">
                    {`${home.address}, ` +
                      `${home.city}, ` +
                      `${home.state} ` +
                      `${home.zip_code}`}
                  </CardTitle>
                  <Button onClick={this.manageHouseToggle} color="primary">
                    Buy Home
                  </Button>{" "}
                </CardBody>
              </Card>
            </CardDeck>
          </Col>
        </div>
      );
    });
    return (
      <div>
        <Search callbackFromParent={this.myCallback} />
        <Row>{homesJsx}</Row>
      </div>
    );
  }
}

export default Rent;
