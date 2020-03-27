import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

export default class AccountEditor extends Component {
  static contextType = GlobalContext;

  state = {
    account: {
      email: "",
      name: "",
      phone: "",
      address: ""
    },
    loading: true
  };

  setEmail = e => {
    this.setState({
      account: { ...this.state.account, email: e.target.value }
    });
  };

  setName = e => {
    this.setState({ account: { ...this.state.account, name: e.target.value } });
  };

  setPhone = e => {
    this.setState({
      account: { ...this.state.account, phone: e.target.value }
    });
  };

  setAddress = e => {
    this.setState({
      account: { ...this.state.account, address: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.account);
  };

  componentDidUpdate() {
    if (this.state.account.email) return;
    const { account } = this.context;
    if (!account.email) return;
    this.setState({
      account: {
        email: account.email || "",
        name: account.name || "",
        phone: account.phone || "",
        address: account.address || ""
      },
      loading: false
    });
  }

  render() {
    const { email, name, phone, address } = this.state.account;
    const { loading } = this.state;
    return (
      <>
        {loading ? (
          <div>Loading</div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <h4>Details Editor</h4>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={name}
                defaultValue={name}
                onChange={this.setName}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                readOnly
                placeholder={email}
                defaultValue={email}
                onChange={this.setEmail}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder={phone}
                defaultValue={phone}
                onChange={this.setPhone}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder={address}
                defaultValue={address}
                onChange={this.setAddress}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="float-right ml-2"
            >
              Update Details
            </Button>
          </Form>
        )}
      </>
    );
  }
}
