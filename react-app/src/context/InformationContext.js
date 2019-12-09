import React, { createContext, Component } from "react";
import axios from "axios";

export const InformationContext = createContext();

export class InformationProvider extends Component {
  state = {
    information: {}
  };

  componentDidMount() {
    axios
      .get("/api/information")
      .then(response => {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          );
          return;
        }
        this.setState({ information: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  setInformation = (information, tokenConfig) => {
    // need to somehow get the token config here so it can be passed to the request
    const { _id } = this.state.information;
    axios
      .put(`/api/information/${_id}`, information)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          );
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
    return (
      <InformationContext.Provider
        value={{
          information,
          setInformation: this.setInformation
        }}
      >
        {this.props.children}
      </InformationContext.Provider>
    );
  }
}
