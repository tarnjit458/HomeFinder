import React from "react";
import "./App.css";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Buy from "./components/Buy.jsx";
import Rent from "./components/Rent.jsx";
import RentSell from "./components/Rental-Sell.jsx";
import Layout from "./components/Layout.jsx";
import Profile from "./components/Profile.jsx";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/buy">
            <Buy />
          </Route>
          <Route path="/rent">
            <Rent />
          </Route>
          <Route path="/rent-sell">
            <RentSell />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
