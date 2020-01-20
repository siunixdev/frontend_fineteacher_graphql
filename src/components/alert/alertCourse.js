import React, { Component } from "react";
import { Alert } from "@material-ui/lab";

import "../../App.css";

class AlertCourse extends Component {
  render() {
    return (
      <>
        <Alert severity={this.props.type} className="mb-20">
          {this.props.message}
        </Alert>
      </>
    );
  }
}

export default AlertCourse;
