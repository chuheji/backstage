import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {setCookie} from "../../common/cookie";

export default class Private extends Component {
  render() {
    return (
      setCookie("account")===null?
      <Redirect to="/login"/>:
      <Redirect to="/layout"/>
)
  }
}
