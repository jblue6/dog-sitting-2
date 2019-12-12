import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import UpdateMessage from "./UpdateMessage"

import { InformationContext } from "../../context/InformationContext";

class InformationEditor extends Component {
  static contextType = InformationContext;

  state = { title: "", about: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { title, about } = this.state;
    this.context.setInformation({ title, about });
  };

  setTitle = e => {
    const title = e.target.value;
    this.setState({ title });
  };

  setAbout = e => {
    const about = e.target.value;
    this.setState({ about });
  };

  componentDidUpdate() {
    const { title, about } = this.context.information;
    if (this.state.title !== title) this.setState({ title, about })
  }

  render() {
    const { title, about } = this.state;
    const { responseMsg } = this.context;

    return (
      <div className="mt-5">
        <h4>Information Editor</h4>
        <Form className="mb-5 mt-2" onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={title}
              defaultValue={title}
              onChange={this.setTitle}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={about}
              defaultValue={about}
              rows="8"
              onChange={this.setAbout}
            />
          </Form.Group>

          <UpdateMessage responseMsg={responseMsg} />

          <Button variant="primary" type="submit" className="float-right ml-2">
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

export default InformationEditor;
