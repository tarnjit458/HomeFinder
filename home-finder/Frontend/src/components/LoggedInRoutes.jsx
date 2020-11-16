import React from 'react';
import ListingForm from './ListingForm.jsx';
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Buy from "./Buy.jsx";
import Rent from "./Rent.jsx";
import Sell from "../SellPage/Sell.jsx";
import RentOut from "./RentOut.jsx";
import Layout from "./Layout.jsx";
import Profile from "./Profile.jsx";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
  } from "react-router-dom";
  import PageNotFound from "./PageNotFound";

export default class LoggedInRoutes extends React.Component {
    render() {
    return (
            <Layout>
                <Switch>
                    <Route path="/list_form">
                        <ListingForm />
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
                    <Route path="/sell">
                        <Sell />
                    </Route>
                    <Route path="/rent-out">
                        <RentOut />
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
            </Layout>
            );
        }
}