import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";

import { GlobalContext } from "../../context/GlobalState";

import RegisterModal from "./RegisterModal";

class Register extends Component {
  static contextType = GlobalContext;

  render() {
    const { isAuthenticated } = this.context.auth;

    let contents = isAuthenticated ? (
      <Redirect to="/" />
    ) : (
        <RegisterModal />
      );
    return <Container>{contents}</Container>;
  }
}

export default Register;
