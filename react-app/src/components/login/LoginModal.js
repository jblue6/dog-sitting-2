import React, { Component } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

import { GlobalContext } from "../../context/GlobalState";

class LoginModal extends Component {
  static contextType = GlobalContext;

  state = {
    isVisible: true,
    email: "",
    password: ""
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

  setPassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  attemptLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = { email, password };
    this.context.login(credentials);
  };

  render() {
    const { errorMsg } = this.context.auth;

    let contents = this.state.isVisible ? (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>

        <Container>
          <Form className="mb-5 mt-2" onSubmit={this.attemptLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.setEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.setPassword}
              />
            </Form.Group>

            <div style={{ color: "red" }}>{errorMsg}</div>

            <Button
              variant="primary"
              type="submit"
              className="float-right ml-2"
            >
              Login
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
          Login
      </Button>
      );
    return <div>{contents}</div>;
  }
}

export default LoginModal;
