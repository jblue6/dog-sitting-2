import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import { GlobalContext } from "../../context/GlobalState";
import AccountEditor from './AccountEditor';

export default class Account extends Component {
  static contextType = GlobalContext;

  render() {
    const { isAuthenticated, errorMsg } = this.context.auth;
    const { isAdmin } = this.context.auth.user;

    const content = (isAuthenticated && isAdmin) ? (
      <div>
        <div>{errorMsg}</div>
        <AccountEditor />
      </div>
    ) : (
        <div>Insufficient Rights</div>
      );

    return <Container className="mt-2">{content}</Container>;
  }
}
