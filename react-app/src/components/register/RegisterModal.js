import React, { Component } from 'react';
import { Modal, Button, Form, Container } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

export default class RegisterModal extends Component {
  static contextType = GlobalContext;

  state = {
    isVisible: true,
    email: "",
    password1: "",
    password2: "",
    errorMsg: ""
  };

  showDialog = () => {
    this.setState({ isVisible: true });
  };

  hideDialog = () => {
    this.setState({ isVisible: false });
  };

  setEmail = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  setPassword1 = e => {
    const password1 = e.target.value;
    this.setState({ password1 });
  };

  setPassword2 = e => {
    const password2 = e.target.value;
    this.setState({ password2 });
  };

  attemptRegister = e => {
    e.preventDefault();
    const { email, password1, password2 } = this.state;
    if (password1 !== password2) return this.setState({ errorMsg: "Passwords do not match" });
    this.setState({ errorMsg: "" });
    const credentials = { email, password: password1 };
    this.context.register(credentials);
  };

  render() {
    const errorMsg = this.context.auth.errorMsg || this.state.errorMsg;

    let contents = this.state.isVisible ? (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Register Account</Modal.Title>
        </Modal.Header>

        <Container>
          <Form className="mb-5 mt-2" onSubmit={this.attemptRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.setEmail}
                value={this.state.email}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.setPassword1}
                value={this.state.password1}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={this.setPassword2}
                value={this.state.password2}
              />
            </Form.Group>

            <div style={{ color: "red" }}>{errorMsg}</div>

            <Button
              variant="primary"
              type="submit"
              className="float-right ml-2"
            >
              Register
            </Button>
            <Button
              variant="secondary"
              onClick={this.hideDialog}
              className="float-right mb-3"
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </Modal.Dialog>
    ) : (
        <Button variant="primary" onClick={this.showDialog} className="mt-3">
          Register
      </Button>
      );
    return <Container>{contents}</Container>;
  }
}
