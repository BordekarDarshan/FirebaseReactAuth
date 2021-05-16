import React, { Component } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@material-ui/core";
import { Field, Wrapper, SubmitWrapper } from "../SignUp/Signup.style";
import { Container } from "./Login.style";
import { withRouter } from "react-router";

export class Login extends Component {
  state = {
    initialState: {
      phone: "",
      password: "",
    },
  };
  handleSubmitHandler = () => {
    this.props.history.push("/profile");
  };
  render() {
    return (
      <Wrapper>
        <Container>
          <Formik
            initialValues={this.state.initialState}
            validationSchema={Yup.object().shape({
              phone: Yup.number().required("Please provide phone number"),
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
                  name="phone"
                  variant="outlined"
                  label="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    margin: "0 0 1rem 0",
                    boxSizing: "border-box",
                  }}
                  error={errors.phone}
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
                  <Button type="submit" variant="contained" color="primary">
                    SIGN IN
                  </Button>
                </SubmitWrapper>
              </form>
            )}
          </Formik>
        </Container>
      </Wrapper>
    );
  }
}

export default withRouter(Login);
