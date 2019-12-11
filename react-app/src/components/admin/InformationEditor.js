import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { InformationContext } from "../../context/InformationContext";

class InformationEditor extends Component {
  static contextType = InformationContext;

  state = { title: "", about: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { title, about } = this.state;
    const { tokenConfig } = this.props;
    this.context.setInformation({ title, about }, tokenConfig);
  };

  setTitle = e => {
    const title = e.target.value;
    this.setState({ title });
  };

  setAbout = e => {
    const about = e.target.value;
    this.setState({ about });
  };

  componentDidMount = () => {
    const { title, about } = this.context.information;
    this.setState({ title, about });
  };

  render() {
    const { title, about } = this.context.information;
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

export default InformationEditor;
