import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { CustomInput, PrimaryButton } from "../Common";
import GoogleButton from "../GoogleButton";
import { callLogIn } from "../../actions/index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
  background: #374353;
  width: 300px;
  margin: 0 auto;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const CustomInputTop = styled(CustomInput)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CustomInputBottom = styled(CustomInput)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: none;
`;

const LoginButton = styled(PrimaryButton)`
  width: 300px;
  height: 75px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogInSubmit = (e, userInput, history) => {
    e.preventDefault();
    this.props.callLogIn(e, userInput, history);
  };

  render() {
    let userInput = {
      email: this.state.email,
      password: this.state.password
    };

    let history = this.props.history;
    return (
      <Fragment>
        <Main>
          <FormWrapper
            method="post"
            onSubmit={e => {
              this.handleLogInSubmit(e, userInput, history);
            }}
          >
            <CustomInputTop
              placeholder="email"
              required
              type="text"
              onChange={this.changeHandler}
              name="email"
              value={this.state.email}
            />{" "}
            <CustomInputBottom
              placeholder="password"
              required
              type="password"
              name="password"
              onChange={this.changeHandler}
              value={this.state.password}
            />
            <LoginButton type="submit">Sign In</LoginButton>
          </FormWrapper>
          <p>- or - </p>
          <GoogleButton history={history} />
        </Main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    callLogIn
  }
)(Login);
