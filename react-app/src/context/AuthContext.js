import React, { createContext, Component } from "react";
import axios from "axios";

export const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    auth: {
      isAuthenticated: false,
      user: {},
      errorMsg: ""
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

        // set token to local storage
        localStorage.setItem("token", token);

        this.setState({
          auth: {
            isAuthenticated: true,
            user,
            errorMsg: ""
          }
        });
      })
      // on failure
      .catch(err => {
        const errorMsg = err.response.data.msg;
        this.logout(errorMsg);
      });
  };

  logout = (errorMsg = "") => {
    this.setState({
      auth: {
        isAuthenticated: false,
        user: {},
        errorMsg
      }
    });
    localStorage.removeItem("token");
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const tokenConfig = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    };

    // check if user is authenticated
    axios
      .get("/api/auth/user", tokenConfig)
      .then(res => {
        // if the token is valid
        const { user } = res.data;
        this.setState({
          auth: {
            isAuthenticated: true,
            user,
            errorMsg: ""
          }
        })
      })
      .catch(err => {
        // will be triggered if the token is no longer valid
        this.logout("Session Expired. Please Log in again");
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
