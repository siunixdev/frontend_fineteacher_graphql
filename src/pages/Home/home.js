/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import "../../App.css";
import "./Home.css";
import Navbar from "../../components/navbar/navbar";
import CardCourse from "../../components/card/card";
import BannerImage from "../../img/banner.png";
import AuthContext from "../../context/auth-context";
import { Link } from "react-router-dom";
import AlertCourse from "../../components/alert/alertCourse";

class Login extends Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      couseList: []
    };
  }

  componentDidMount() {
    const requestBody = {
      query: `
        query {
          courses{
            _id
            title
            description
            price
            totalMaxStudent
            address
            createdBy {
              _id
              email
            }
            category {
              _id
              title
            }
          }
        }
      `
    };

    fetch("http://localhost:5000/graphql", {
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
          this.setState({
            couseList: data.data.courses
          });
        }
      })
      .catch(err => {
        this.setState({
          message: (
            <AlertCourse message="Opps, sorry something wrong!" type="error" />
          )
        });
      });
  }

  render() {
    return (
      <Grid>
        <Navbar />
        <Grid className="banner-home">
          <Grid container>
            <Grid item lg={6} sm={6}>
              <div style={{ height: 650 }}>
                <img
                  src={BannerImage}
                  style={{ height: "100%", display: "flex", bottom: 0 }}
                />
              </div>
            </Grid>
            <Grid item lg={6} sm={6} style={{ marginTop: 100 }}>
              {this.state.token === null && this.state.userId === null ? (
                <>
                  <h1 className="title-banner">Find your best techer!</h1>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      size="large"
                      style={{
                        height: 70,
                        paddingRight: 50,
                        paddingLeft: 50,
                        fontSize: 20,
                        backgroundColor: "#FFC300",
                        color: "#000"
                      }}
                    >
                      FREE REGISTER!
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="title-banner">Hi, How are you today ?</h1>
                  <Link to="/register">
                    <Button
                      variant="contained"
                      size="large"
                      style={{
                        height: 70,
                        paddingRight: 50,
                        paddingLeft: 50,
                        fontSize: 20,
                        backgroundColor: "#FFC300",
                        color: "#000"
                      }}
                    >
                      POST YOUR COURSE
                    </Button>
                  </Link>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <div className="container-course">
          <h1 className="color-primary">Course</h1>
          <Grid container spacing={4}>
            {this.state.couseList.map((course, i) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={i}>
                <CardCourse
                  title={course.title}
                  address={course.address}
                  description={course.description}
                  author={course.createdBy.email}
                  id={course._id}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default Login;
