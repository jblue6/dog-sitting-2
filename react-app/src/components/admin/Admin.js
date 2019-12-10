import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

import { AuthContext } from "../../context/AuthContext";

import { InformationProvider } from "../../context/InformationContext";
import { PricesProvider } from "../../context/PricesContext";
import { ContactProvider } from "../../context/ContactContext";

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
    const { isAuthenticated, errorMsg, tokenConfig } = this.context.auth;

    const content = isAuthenticated ? (
      <div>
        <div>{errorMsg}</div>
        <Button className="float-right" onClick={this.logout}>
          Logout
        </Button>

        <div>Login Successful</div>

        <InformationProvider>
          <InformationEditor tokenConfig={tokenConfig} />
        </InformationProvider>

        <PricesProvider>
          <PriceEditor tokenConfig={tokenConfig} />
        </PricesProvider>

        <ContactProvider>
          <ContactEditor tokenConfig={tokenConfig} />
        </ContactProvider>
      </div>
    ) : (
        <LoginModal />
      );

    return <Container>{content}</Container>;
  }
}

export default Admin;
