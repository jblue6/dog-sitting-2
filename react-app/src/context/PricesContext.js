import React, { createContext, Component } from "react";
import axios from "axios";

export const PricesContext = createContext();

export class PricesProvider extends Component {
  state = {
    prices: [],
    responseMsg: ""
  };

  componentDidMount() {
    axios
      .get("/api/Prices")
      .then(response => {
        if (response.status !== 200) {
          return;
        }

        this.setState({ prices: response.data });
      })
      .catch(function (err) {
        console.log("", err);
      });
  }

  setPrices = (prices, tokenConfig) => {
    axios
      .post(`/api/prices/`, { prices }, tokenConfig)
      .then(response => {
        if (response.status !== 200) {
          this.setState({ responseMsg: "Update Failed" });
          return;
        }

        this.setState({ prices, responseMsg: "Succesfully Updated" });
      })
      .catch(function (err) {
        console.log("", err);
      });
  };

  render() {
    const { prices, responseMsg } = this.state;
    const { setPrices } = this;
    return (
      <PricesContext.Provider value={{ prices, setPrices, responseMsg }}>
        {this.props.children}
      </PricesContext.Provider>
    );
  }
}
