import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

import ContentEditor from "./ContentEditor";
import BookingApproval from "./BookingApproval";

class Admin extends Component {
  static contextType = GlobalContext;

  render() {
    const { isAuthenticated, errorMsg } = this.context.auth;
    const { isAdmin } = this.context.auth.user;

    const content = (isAuthenticated && isAdmin) ? (
      <div>
        <div>{errorMsg}</div>
        <ContentEditor />
        <BookingApproval />
      </div>
    ) : (
        <div>Insufficient Rights</div>
      );

    return <Container className="mt-2">{content}</Container>;
  }
}

export default Admin;