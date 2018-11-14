import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ScreensLanding from "./screens/Landing";
import ScreensLogin from "./screens/Login";
import ScreensRegister from "./screens/Register";
import ScreensMissionControl from "./screens/MissionControl";
import ScreensConvoList from "./screens/ConvoList";
import { connect } from "react-redux";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import { Logo } from "./components/Common";

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  background: #374353;
  background-position: fixed;
  color: #374353;
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 4rem 25rem 5rem;
`;

const FadedLogo = styled(Logo)``;

const Content = styled.div`
  grid-column: 1/3;
  grid-row: 2;
`;

const Footer = styled.div`
  grid-column: 2;
  grid-row: 4;
  background: black;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <FadedLogo src="../images/logo.png" width="190x" height="60px" />
        <Header />{" "}
        {/* {this.props.history.location.pathname === "/landing" ? null : (
                  
                )} */}
        <Route
          exact
          path="/"
          render={() =>
            this.props.logInSuccess ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/landing" />
            )
          }
        />
        <Switch>
          <Route exact path="/landing" component={ScreensLanding} />{" "}
          <Content>
            <Route exact path="/login" component={ScreensLogin} />{" "}
            <Route exact path="/register" component={ScreensRegister} />{" "}
            <Route
              exact
              path="/missioncontrol"
              component={ScreensMissionControl}
            />{" "}
            <Route exact path="/dashboard" component={ScreensConvoList} />{" "}
          </Content>{" "}
        </Switch>{" "}
      </AppWrapper>
    );
  }
}
// export default App;
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(App);
