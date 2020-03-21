import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { AuthContext } from "../../context/AuthContext";

import { InformationProvider } from "../../context/InformationContext";
import { PricesProvider } from "../../context/PricesContext";
import { ContactProvider } from "../../context/ContactContext";

import InformationEditor from "./InformationEditor";
import PriceEditor from "./PriceEditor";
import ContactEditor from "./ContactEditor";

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
        <InformationProvider>
          <InformationEditor />
        </InformationProvider>

        <PricesProvider>
          <PriceEditor />
        </PricesProvider>

        <ContactProvider>
          <ContactEditor />
        </ContactProvider>
      </div>
    ) : (
        //<Redirect to="/" />
        <div>Logged Out</div>
      );

    return <Container className="mt-2">{content}</Container>;
  }
}

export default Admin;