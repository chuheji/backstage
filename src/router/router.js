import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import history from '../components/common/history';
import Login from '../page/login/index'
import Layout from './../components/layout/index';
import NoMatch from '../page/nomatch/nomatch'

const BasicRoute = () => (
  <Router history={history}>
    <Switch>
      <Route path="/layout">
        <Layout />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);


export default BasicRoute;