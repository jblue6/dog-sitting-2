import React, { createContext, Component } from "react";
import axios from "axios";

export const PricesContext = createContext();

export class PricesProvider extends Component {
  state = {
    prices: []
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
          return;
        }

        this.setState({ prices });
      })
      .catch(function (err) {
        console.log("", err);
      });
  };

  render() {
    const { prices } = this.state;
    const { setPrices } = this;
    return (
      <PricesContext.Provider value={{ prices, setPrices }}>
        {this.props.children}
      </PricesContext.Provider>
    );
  }
}
