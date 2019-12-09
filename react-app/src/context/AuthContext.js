import React, { createContext, Component } from "react";

export const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    auth: {
      isAuthenticated: false,
      errorMsg: "",
      token: "",
      tokenConfig: {},
      user: {}
    }
  };

  setAuth = auth => {
    const token = auth.token;

    const tokenConfig = {
      headers: {
        "Content-type": "application/json"
      }
    };

    if (token) {
      tokenConfig.headers["x-auth-token"] = token;
    }

    auth.tokenConfig = tokenConfig;

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
