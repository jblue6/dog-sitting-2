import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import InformationEditor from "./InformationEditor";
import PriceEditor from "./PriceEditor";
import ContactEditor from "./ContactEditor";

class Admin extends Component {
  static contextType = GlobalContext;

  logout = e => {
    e.preventDefault();
    this.context.logout();
  };

  render() {
    const { isAuthenticated, errorMsg } = this.context.auth;
    const { is_admin } = this.context.auth.user;

    const content = (isAuthenticated && is_admin) ? (
      <div>
        <div>{errorMsg}</div>
        <InformationEditor />
        <PriceEditor />
        <ContactEditor />
      </div>
    ) : (
        //<Redirect to="/" />
        <div>Insufficient Rights</div>
      );

    return <Container className="mt-2">{content}</Container>;
  }
}

export default Admin;