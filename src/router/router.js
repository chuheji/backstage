import React from 'react';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import history from '../common/history';
import Login from '../page/login/index'
import Layout from './../components/layout/index';
import Private from './../components/private/index';
import NoMatch from '../page/nomatch/nomatch'

const BasicRoute = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <Private />
      </Route>
      <Route path="/layout">
        <Layout />
      </Route>
      <Route exact path="/layout/home">
        <Private />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);


export default BasicRoute;