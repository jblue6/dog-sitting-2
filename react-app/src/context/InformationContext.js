import React, { createContext, Component } from "react";
import axios from "axios";

// create context
export const InformationContext = createContext();
InformationContext.displayName = "InformationContext";

// create the provider
export class InformationProvider extends Component {
  state = {
    information: {}
  };

  componentDidMount() {
    axios
      .get("/api/information")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        this.setState({ information: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  setInformation = (information, tokenConfig) => {
    const { _id } = this.state.information;
    axios
      .put(`/api/information/${_id}`, information, tokenConfig)
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        const { title, about } = information;
        const newInformation = { _id, title, about }
        this.setState({ information: newInformation });
      })
      .catch(function (err) {
        console.log("", err);
      });
  };

  render() {
    const { information } = this.state;
    const { setInformation } = this;
    return (
      <InformationContext.Provider value={{ information, setInformation }}>
        {this.props.children}
      </InformationContext.Provider >
    );
  }
}
