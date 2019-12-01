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
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          );
          return;
        }
        this.setState({ prices: response.data });
      })
      .catch(function(err) {
        console.log("", err);
      });
  }
  setPrices = prices => {
    // put the logic here to post to the database

    this.setState(prices);
  };

  render() {
    const { prices } = this.state;
    return (
      <PricesContext.Provider value={{ prices, setPrices: this.setPrices }}>
        {this.props.children}
      </PricesContext.Provider>
    );
  }
}
