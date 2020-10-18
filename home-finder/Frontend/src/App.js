import React from 'react';
import './App.css';

import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Buy from './components/Buy.jsx';
import Rent from './components/Rent.jsx';
import RentSell from './components/Rental-Sell.jsx';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/buy">
            <Buy />
          </Route>
          <Route exact path="/rent">
            <Rent />
          </Route>
          <Route exact path="/rent-sell">
            <RentSell />
          </Route>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          
          <Route path="*">
            <PageNotFound />  
          </Route> 
      </Switch>
    </Router>
  );
}

export default App;
