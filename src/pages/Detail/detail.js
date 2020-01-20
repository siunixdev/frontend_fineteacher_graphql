import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import "../../App.css";
import "./Detail.css";
import Navbar from "../../components/navbar/navbar";

class Login extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="banner"></div>
        <div className="container">
          <h1 className="color-primary">Course Title</h1>
          <Card elevation={3} className="content">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div className="profile-badge">
                  <div className="user-picture" />
                  <div className="profile-title">
                    <h2 className="profile-name color-gray">Muhammad Salah</h2>
                    <p className="profile-email color-primary">
                      salah@gmail.com
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={8}>
                <h2>Description</h2>
                <p className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  lacinia velit quis diam eleifend, pretium varius purus
                  lobortis. Sed eu placerat arcu. Integer tincidunt sit amet
                  justo et aliquet. Nullam sodales justo vitae tincidunt
                  egestas. Suspendisse blandit accumsan luctus. In pellentesque
                  aliquet ante vitae cursus. Phasellus malesuada massa cursus
                  erat malesuada imperdiet. Nullam sit amet interdum velit.
                  Morbi sed hendrerit metus, et malesuada felis. Morbi sit amet
                  erat vitae est auctor fermentum. Donec auctor venenatis nisi,
                  non facilisis nisl mattis sed. Praesent non porttitor odio.
                  Maecenas ut odio non arcu pharetra lobortis. Nam vitae eros
                  mattis, consequat turpis quis, faucibus massa.
                </p>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
