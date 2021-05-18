import React, { Component } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@material-ui/core";
import { Field, Wrapper, SubmitWrapper } from "../SignUp/Signup.style";
import { Container } from "./Login.style";
import { withRouter } from "react-router";
import { loginThunk } from "../../Redux/Login/action";
import { connect } from "react-redux";

export class Login extends Component {
  state = {
    initialState: {
      email: "",
      password: "",
    },
    loader: false,
  };
  handleSubmitHandler = (values) => {
    this.setState({ loader: true });
    this.props
      .loginThunk({
        email: values.email,
        password: values.password,
      })
      .then(() => {
        this.setState({ loader: false });
        if (this.props.loginData) {
          this.props.history.push("/profile");
        }
      });
  };
  render() {
    return (
      <Wrapper>
        <Container>
          <Formik
            initialValues={this.state.initialState}
            validationSchema={Yup.object().shape({
              email: Yup.string().required("Please provide email number"),
              password: Yup.string()
                .required("No password provided")
                .min(8, "Password must be 8 characters long"),
            })}
            onSubmit={(values, { resetForm }) => {
              this.handleSubmitHandler(values, resetForm);
            }}
          >
            {({ errors, handleSubmit, values, handleChange }) => (
              <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <Field
                  id="outlined-basic"
                  name="email"
                  variant="outlined"
                  label="email"
                  value={values.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    margin: "0 0 1rem 0",
                    boxSizing: "border-box",
                  }}
                  error={errors.email}
                />

                <Field
                  id="outlined-basic"
                  name="password"
                  variant="outlined"
                  label="password"
                  value={values.password}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "1rem 0",
                  }}
                  error={errors.password}
                />

                <SubmitWrapper>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={this.state.loader}
                  >
                    {this.state.loader ? `....` : `SIGN IN`}
                  </Button>
                  <span>
                    Create new account?{" "}
                    <span onClick={() => this.props.history.push("/")}>
                      Sign Up
                    </span>
                  </span>
                </SubmitWrapper>
              </form>
            )}
          </Formik>
        </Container>
      </Wrapper>
    );
  }
}
let mapStateToProps = (state) => ({
  loginData: state.login.loginSuccess,
});

export default withRouter(connect(mapStateToProps, { loginThunk })(Login));
