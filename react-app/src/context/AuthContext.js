import React, { createContext, Component } from "react";
import axios from "axios";

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

  login = credentials => {
    const body = JSON.stringify(credentials);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post("/api/auth", body, config)
      // on success
      .then(res => {
        const { token, user } = res.data;

        const tokenConfig = {
          headers: {
            "Content-type": "application/json"
          }
        };

        if (token) {
          tokenConfig.headers["x-auth-token"] = token;
        }

        this.setState({
          auth: {
            isAuthenticated: true,
            errorMsg: "",
            token,
            tokenConfig,
            user
          }
        });
      })
      // on failure
      .catch(err => {
        const errorMsg = err.response.data.msg;
        this.logout(errorMsg);
      });
  }

  logout = (errorMsg = "") => {
    this.setState({
      auth: {
        isAuthenticated: false,
        errorMsg,
        token: "",
        tokenConfig: {},
        user: {}
      }
    });
  }

  render() {
    const { auth } = this.state;
    const { login, logout } = this;
    return (
      <AuthContext.Provider value={{ auth, login, logout }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
