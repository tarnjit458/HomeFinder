import React from "react";
import "./App.css";

import Login from "./components/Login.jsx";
import LoggedInRoutes from "./components/LoggedInRoutes.jsx";
import { createBrowserHistory } from 'history';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

class App extends React.Component {

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  }
  render(){
    let history = createBrowserHistory();
    return (
        <Router forceRefresh={true} history={history}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/"
                    render={props => {
                        if (this.isLoggedIn()) {
                            return <LoggedInRoutes {...props} />;
                        } else {
                            return <Redirect to="/login"/>;
                        }
                    }} />
          </Switch>
        </Router>
    );
  }
}

export default App;
