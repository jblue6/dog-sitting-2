import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";

import { GlobalContext } from "../../context/GlobalState";

import LoginModal from "./LoginModal";

class Login extends Component {
  static contextType = GlobalContext;

  render() {
    const { isAuthenticated } = this.context.auth;

    let contents = isAuthenticated ? (
      <Redirect to="/" />
    ) : (
        <LoginModal />
      );
    return <Container>{contents}</Container>;
  }
}

export default Login;
