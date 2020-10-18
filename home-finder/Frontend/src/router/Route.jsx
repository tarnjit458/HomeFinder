import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/Login.jsx';
import Home from '../components/Home.jsx';

export function MainRoute() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
        </Switch>
        </BrowserRouter>
    );
}