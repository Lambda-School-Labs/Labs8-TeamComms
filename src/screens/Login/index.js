import React, { Component } from "react";
import Login from "../../components/Login";
import PropTypes from "prop-types";

//this screen should return components necessary to build the landing page.

class ScreensLogin extends Component {
  render(props) {
    return (
      <React.Fragment>
        <Login {...this.props} />
      </React.Fragment>
    );
  }
}
ScreensLogin.propTypes = {};

export default ScreensLogin;
