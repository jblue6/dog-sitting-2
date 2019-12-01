import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

import LoginModal from "./LoginModal";

import { AuthContext } from "../../context/AuthContext";
import InformationEditor from "./InformationEditor";
import PriceEditor from "./PriceEditor";

class Admin extends Component {
  static contextType = AuthContext;

  logout = e => {
    e.preventDefault();

    this.context.setAuth({
      isAuthenticated: false,
      email: ""
    });
  };

  render() {
    const { isAuthenticated } = this.context.auth;

    const content = isAuthenticated ? (
      <div>
        <Button className="float-right" onClick={this.logout}>
          Logout
        </Button>
        <div>Login Successful</div>
        <InformationEditor />
        <PriceEditor />
      </div>
    ) : (
      <LoginModal />
    );

    return <Container>{content}</Container>;
  }
}

export default Admin;
