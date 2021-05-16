import React, { Component } from "react";
import { withRouter } from "react-router";
import Signup from "../SignUp/Signup";

export class Profile extends Component {
  render() {
    let { location } = this.props;
    return <Signup profile={location.pathname} />;
  }
}

export default withRouter(Profile);
