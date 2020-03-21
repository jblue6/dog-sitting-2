import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import LoginModal from "./LoginModal";

class Login extends Component {
  static contextType = AuthContext;

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
