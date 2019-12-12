import React, { createContext, Component } from "react";
import axios from "axios";

export const AuthContext = createContext();

export class AuthProvider extends Component {
  state = {
    auth: {
      isAuthenticated: false,
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
        const { token } = res.data;

        // set token to local storage
        localStorage.setItem("token", token);

        this.setState({
          auth: {
            isAuthenticated: true,
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
        errorMsg
      }
    });
    localStorage.removeItem("token");
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) this.setState({ auth: { isAuthenticated: true } });
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
