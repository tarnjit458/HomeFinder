import React from "react";
import ListingForm from "./SellRentOutPage/ListingForm.jsx";
import Home from "./Home.jsx";
import Buy from "./BuyRentPage/Buy.jsx";
import Rent from "./BuyRentPage/Rent.jsx";
import Sell from "./SellRentOutPage/Sell.jsx";
import RentOut from "./SellRentOutPage/RentOut.jsx";
import Layout from "./Layout.jsx";
import Admin from "./Admin.jsx";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default class LoggedInRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: localStorage.getItem("role"),
    };
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/list_form" render={props => {
                            return <ListingForm {...props} />;
                        }} />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/buy">
            <Buy />
          </Route>
          {this.state.role === "realtor" ? null : (
            <Route path="/rent">
              <Rent />
            </Route>
          )}
          <Route path="/sell">
            <Sell />
          </Route>
          <Route path="/rent-out">
            <RentOut />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          {this.state.role === "administrator" ? (
            <Route exact path="/">
              <Redirect to="/admin" />
            </Route>
          ) : (
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          )}

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Layout>
    );
  }
}
