/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { LocalLibrary } from "@material-ui/icons";
import AlertCourse from "../../components/alert/alertCourse";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import "./Auth.css";
import "../../App.css";
import LoginImage from "../../img/login-img.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  static contextType = AuthContext;

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  login = async event => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    const requestBody = {
      query: `
        query {
          sign(email:"${email}", password: "${password}") {
            message
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    await fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(result => {
        if (result.status === 200 || result.status === 201) {
          return result.json();
        } else {
          this.setState({
            message: <AlertCourse message="Failed" type="error" />
          });
        }
        return result.json();
      })
      .then(data => {
        if (data.errors) {
          const errorMessage = data.errors[0].message;

          this.setState({
            message: <AlertCourse message={errorMessage} type="error" />
          });
        } else {
          localStorage.setItem("token", data.data.sign.token);
          localStorage.setItem("userId", data.data.sign.userId);
          localStorage.setItem(
            "tokenExpiration",
            data.data.sign.tokenExpiration
          );
          const signdata = data.data.sign;

          const signMessage = signdata.message;
          this.setState({
            message: <AlertCourse message={signMessage} type="success" />
          });

          this.setState({ fullname: "" });
          this.setState({ email: "" });
          this.setState({ password: "" });

          window.location.href = "http://localhost:3000/";
        }
      })
      .catch(err => {
        this.setState({
          message: (
            <AlertCourse message="Opps, sorry something wrong!" type="error" />
          )
        });
      });
  };

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12} sm={6} md={8} lg={8} className="box-left">
            <div className="header">
              <Link to="/">
                <h1 className="title">
                  <LocalLibrary style={{ fontSize: 70 }} /> Fineteacher
                </h1>
              </Link>
              <p className="subtitle">
                Find your best teacher everywhere and anywhere
              </p>
            </div>
            <div className="body">
              <img src={LoginImage} style={{ width: "50%" }} />
            </div>
            <div className="footer">
              <p>&copy; Dumbways Student</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} className="box-right">
            <h1 className="title-right">Login</h1>
            <h1 className="mt-0 mb-10">Welcome Back</h1>
            <p className="mb-40 mt-0 color-gray">
              Sign to your account using email and password
            </p>
            {this.state.message}
            <form>
              <TextField
                required
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                className="mb-20"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <TextField
                required
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className="mb-20"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <Button
                onClick={this.login}
                variant="contained"
                className="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
            <p>
              Don't have an account ?{" "}
              <span className="color-primary">
                <Link to="/register" className="linkDecoration">
                  Register Now
                </Link>
              </span>
            </p>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Login;
