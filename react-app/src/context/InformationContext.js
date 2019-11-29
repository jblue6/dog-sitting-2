import React, { createContext, Component } from 'react';
import axios from "axios";

export const InformationContext = createContext();

export class InformationProvider extends Component {
  state = {
    information: {}
  }

  componentDidMount() {
    axios
      .get("/api/information")
      .then(response => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`);
          return;
        }
        this.setState({ information: response.data });
      }
      )
      .catch(function (err) {
        console.log('', err);
      })
  }
  setInformation = (information) => {
    this.setState(information)
  }

  render() {
    const { information } = this.state;
    return (
      <InformationContext.Provider value={{ information, setInformation: this.setInformation }}>
        {this.props.children}
      </InformationContext.Provider>
    )
  }
}