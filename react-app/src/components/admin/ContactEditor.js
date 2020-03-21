import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import UpdateMessage from "./UpdateMessage"

import { GlobalContext } from "../../context/GlobalState";

class ContactEditor extends Component {
  static contextType = GlobalContext;

  handleSubmit = e => {
    e.preventDefault();
    this.context.setContact();
  };

  render() {
    const { email, phone } = this.context.contact;
    const { responseMsg } = this.context;

    return (
      <div className="mt-5">
        <h4>Contact Editor</h4>
        <Form className="mb-5 mt-2" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={email}
              defaultValue={email}
              onChange={this.context.setEmail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder={phone}
              defaultValue={phone}
              onChange={this.context.setPhone}
            />
          </Form.Group>

          <UpdateMessage responseMsg={responseMsg} />

          <Button variant="primary" type="submit" className="float-right ml-2 mb-5">
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

export default ContactEditor;
