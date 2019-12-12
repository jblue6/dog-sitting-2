import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

import { AuthContext } from "../../context/AuthContext";

import InformationEditor from "./InformationEditor";
import PriceEditor from "./PriceEditor";
import ContactEditor from "./ContactEditor";
import LoginModal from "./LoginModal";

class Admin extends Component {
  static contextType = AuthContext;

  logout = e => {
    e.preventDefault();
    this.context.logout();
  };

  render() {
    const { isAuthenticated, errorMsg } = this.context.auth;

    const content = isAuthenticated ? (
      <div>
        <div>{errorMsg}</div>
        <Button className="float-right" onClick={this.logout}>
          Logout
        </Button>

        <div>Login Successful</div>

        <InformationEditor />

        <PriceEditor />

        <ContactEditor />
      </div>
    ) : (
        <LoginModal />
      );

    return <Container className="mt-2">{content}</Container>;
  }
}

export default Admin;