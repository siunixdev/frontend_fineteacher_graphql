import React, { Component } from "react";
import "./style.css";
import { AppBar, Toolbar, Grid, Button } from "@material-ui/core";
import { LocalLibrary } from "@material-ui/icons";
import AuthContext from "../../context/auth-context";
import { Link } from "react-router-dom";

import "../../App.css";

class Navbar extends Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId")
    };
  }

  // componentDidMount() {
  //   const auth = this.context;
  //   this.setState({ token: auth.token, userId: auth.userId });
  //   console.log(auth.token);
  // }

  logout = () => {
    localStorage.clear();
  };

  render() {
    return (
      <>
        <AppBar position="fixed" className="nav">
          <Toolbar className="toolbar">
            <Grid container>
              <Grid item xs={6} className="child-nav-left">
                <Link to="/" className="linkDecoration nav-title">
                  <LocalLibrary className="mr4" />
                  Fineteacher
                </Link>
              </Grid>
              <Grid item xs={6} className="child-nav-right">
                {this.state.token !== null && this.state.userId !== null ? (
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      className="button-header linkDecoration"
                      onClick={this.logout}
                    >
                      Logout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      className="button-header linkDecoration"
                    >
                      Login!
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default Navbar;
