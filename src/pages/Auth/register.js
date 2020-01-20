/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { LocalLibrary } from "@material-ui/icons";
import AlertCourse from "../../components/alert/alertCourse";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import "./Auth.css";
import "../../App.css";
import RegisterImage from "../../img/register-img.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
      message: ""
    };
  }

  static contextType = AuthContext;

  onChangeFullname = event => {
    this.setState({ fullname: event.target.value });
  };

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  register = async event => {
    event.preventDefault();
    const fullname = this.state.fullname;
    const email = this.state.email;
    const password = this.state.password;

    const requestBody = {
      query: `
      mutation {
        signUp(userInput: { fullname:"${fullname}", email: "${email}", password: "${password}"}){
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
        console.log(data);

        if (data.errors) {
          const errorMessage = data.errors[0].message;

          this.setState({
            message: <AlertCourse message={errorMessage} type="error" />
          });
        } else {
          const signUpdata = data.data.signUp;

          const signUpMessage = signUpdata.message;
          this.setState({
            message: <AlertCourse message={signUpMessage} type="success" />
          });

          this.setState({ fullname: "" });
          this.setState({ email: "" });
          this.setState({ password: "" });
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
              <img src={RegisterImage} style={{ width: "65%" }} />
            </div>
            <div className="footer">
              <p>&copy; Dumbways Student</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} className="box-right">
            <h1 className="title-right">Register</h1>
            <h1 className="mt-0 mb-10">Join with us</h1>
            <p className="mb-40 mt-0 color-gray">
              Signup to find the best place for your course
            </p>
            {this.state.message}
            <form>
              <TextField
                label="Fullname"
                type="text"
                variant="outlined"
                fullWidth
                className="mb-20"
                value={this.state.fullname}
                onChange={this.onChangeFullname}
              />
              <TextField
                label="Email"
                type="text"
                variant="outlined"
                fullWidth
                className="mb-20"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className="mb-20"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <Button
                onClick={this.register}
                variant="contained"
                className="primary"
                fullWidth
              >
                Login
              </Button>
            </form>
            <p>
              Already have an account ?{" "}
              <Link to="/login" className="linkDecoration">
                Login now
              </Link>
            </p>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Login;
