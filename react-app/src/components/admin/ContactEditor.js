import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { ContactContext } from "../../context/ContactContext";

class ContactEditor extends Component {
  static contextType = ContactContext;

  state = { email: "", phone: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { email, phone } = this.state;
    const { tokenConfig } = this.props;
    this.context.setContact({ email, phone }, tokenConfig);
  };

  setEmail = e => {
    const email = e.target.value;
    this.setState({ email });
  };

  setPhone = e => {
    const phone = e.target.value;
    this.setState({ phone });
  };

  componentDidMount = () => {
    const { email, phone } = this.context.contact;
    this.setState({ email, phone });
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
              onChange={this.setEmail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder={phone}
              defaultValue={phone}
              onChange={this.setphone}
            />
          </Form.Group>

          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <div>{responseMsg}</div>
          </ReactCSSTransitionGroup>

          <Button variant="primary" type="submit" className="float-right ml-2">
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

export default ContactEditor;
