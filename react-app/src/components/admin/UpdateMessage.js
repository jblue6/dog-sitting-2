import React, { Component } from "react";

class UpdateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: props.responseMsg }
  }

  componentDidUpdate(prevProps) {
    if (this.props.responseMsg !== prevProps.responseMsg) {
      this.setState({ msg: this.props.responseMsg });
      setTimeout(() => this.setState({ msg: "" }), 400);
    }
  }

  render() {
    const { msg } = this.state;

    const content = msg ?
      <div>{msg}</div> :
      <div></div>;

    return content;
  }
}

export default UpdateMessage;