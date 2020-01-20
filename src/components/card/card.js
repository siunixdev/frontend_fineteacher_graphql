import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Avatar,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";

import "../../App.css";
import "./cardCourse.css";

class CardCourse extends Component {
  render() {
    return (
      <>
        <Card elevation={3}>
          <CardMedia
            style={{ backgroundColor: "#9848de", height: 200 }}
            className="card-media"
          />
          <CardHeader
            avatar={<Avatar aria-label="recipe" alt={this.props.author} />}
            title={this.props.title}
            subheader={this.props.author}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="justify"
            >
              {this.props.description.substring(0, 100)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Join
            </Button>
            <Link to={"/detail/" + this.props.id}>
              <Button size="small" color="primary">
                Read More
              </Button>
            </Link>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default CardCourse;
