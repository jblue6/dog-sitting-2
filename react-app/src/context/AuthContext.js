import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    auth: {
      isAuthenticated: false,
      errorMsg: "",
      token: "",
      user: {}
    }
  };

  setAuth = auth => {
    this.setState({ auth });
  };

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={{ auth, setAuth: this.setAuth }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
