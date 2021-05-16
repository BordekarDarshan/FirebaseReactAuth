import React, { Component } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "@material-ui/core";
import {
  Container,
  Field,
  FirstRow,
  SubmitWrapper,
  Wrapper,
} from "./Signup.style";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { signUpThunk } from "../../Redux/SignUp/action";
import { profileThunk, updateProfileThunk } from "../../Redux/Profile/action";
import { userLogoutThunk } from "../../Redux/Login/action";

export class Signup extends Component {
  state = {
    initialState: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  };
  componentDidMount() {
    if (this.props.profile === "/profile") {
      this.props
        .profileThunk({ user: this.props?.user && this.props.user })
        .then(() => {
          if (this.props.profileData) {
            let { profileData } = this.props;

            let data = {
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              age: profileData.age,
              email: profileData.email,
              phone: profileData.phone,
              address: profileData.address,
            };
            this.setState({
              initialState: data,
            });
          }
        });
    }
  }

  handleSubmitHandler = (values, resetForm, type) => {
    if (type === "add") {
      this.props
        .signUpThunk({
          signUpdata: {
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
            email: values.email,
            phone: values.phone,
            address: values.address,
            password: values.password,
          },
        })
        .then(() => {
          this.props.history.push("/login");
        });
    } else {
      this.props.updateProfileThunk({
        user: this.props?.user && this.props.user,
        signUpdata: {
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
          phone: values.phone,
          address: values.address,
        },
      });
    }
  };

  logoutHandler = () => {
    this.props.userLogoutThunk().then(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    return (
      <Wrapper>
        <Container>
          <Formik
            enableReinitialize
            initialValues={this.state.initialState}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required("Please provide firstName"),
              lastName: Yup.string().required("Please provide lastname"),
              age: Yup.number().required("Please provide age"),
              email: Yup.string().required("Please provide email"),
              password:
                this.props.profile === "/profile"
                  ? Yup.string()
                  : Yup.string()
                      .required("No password provided")
                      .min(8, "Password must be 8 characters long"),
              address: Yup.string().required("Please provide address"),
              phone: Yup.number().required("Please provide number"),
            })}
            onSubmit={(values, { resetForm }) => {
              if (this.props.profile === "/profile") {
                this.handleSubmitHandler(values, resetForm, "update");
              } else {
                this.handleSubmitHandler(values, resetForm, "add");
              }
            }}
          >
            {({ errors, handleSubmit, values, handleChange }) => (
              <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <FirstRow>
                  <Field
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    style={{
                      width: "50%",
                      boxSizing: "border-box",
                      margin: "0 0 1rem 0",
                    }}
                    error={errors.firstName}
                  />

                  <Field
                    id="outlined-basic"
                    name="lastName"
                    variant="outlined"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    style={{
                      width: "50%",
                      margin: "0 0 1rem 0",
                      boxSizing: "border-box",
                    }}
                    error={errors.lastName}
                  />
                </FirstRow>
                <FirstRow>
                  <Field
                    id="outlined-basic"
                    label="Age"
                    variant="outlined"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    style={{
                      width: "50%",
                      boxSizing: "border-box",
                      margin: "0 0 1rem 0",
                    }}
                    error={errors.age}
                  />

                  <Field
                    id="outlined-basic"
                    name="email"
                    variant="outlined"
                    label="Email"
                    value={values.email}
                    disabled={this.props.profile === "/profile" ? true : false}
                    onChange={handleChange}
                    style={{
                      width: "50%",
                      margin: "0 0 1rem 0",
                      boxSizing: "border-box",
                    }}
                    error={errors.email}
                  />
                </FirstRow>
                <Field
                  id="outlined-textarea"
                  label="Phone"
                  multiline
                  variant="outlined"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "1rem 0",
                  }}
                  error={errors.phone}
                />
                <Field
                  id="outlined-textarea"
                  label="Address"
                  multiline
                  variant="outlined"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    margin: "1rem 0",
                  }}
                  error={errors.address}
                />
                {this.props.profile !== "/profile" && (
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
                )}

                <SubmitWrapper>
                  {this.props.profile === "/profile" ? (
                    <>
                      <Button type="submit" variant="contained" color="primary">
                        SAVE
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.logoutHandler()}
                        style={{ margin: "0 0 0 10px" }}
                      >
                        LOGOUT
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="submit" variant="contained" color="primary">
                        SIGN UP
                      </Button>

                      <span>
                        Already have an account?{" "}
                        <span onClick={() => this.props.history.push("/login")}>
                          Log In
                        </span>
                      </span>
                    </>
                  )}
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
  user: state.login.loginSuccess?.user?.uid,
  profileData: state.profile.profileSuccess,
  isUserLoggedIn: state.login.isUserLoggedIn,
});

export default withRouter(
  connect(mapStateToProps, {
    userLogoutThunk,
    signUpThunk,
    profileThunk,
    updateProfileThunk,
  })(Signup)
);
