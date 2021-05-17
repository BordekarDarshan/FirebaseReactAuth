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
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { signUpThunk } from "../../Redux/SignUp/action";
import {
  profileThunk,
  updateProfileThunk,
  uploadImageThunk,
} from "../../Redux/Profile/action";
import { userLogoutThunk } from "../../Redux/Login/action";
import { firebaseStorage } from "../../Firebase/Firebase";

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
      avatar: "",
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
              avatar: profileData.avatar,
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
      firebaseStorage
        .ref(`/images/${values.avatar.name}`)
        .put(values.avatar)
        .on(
          "state_changed",
          (snapShot) => {},
          (err) => {},
          () => {
            firebaseStorage
              .ref("images")
              .child(values.avatar.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
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
                      avatar: fireBaseUrl,
                    },
                  })
                  .then(() => {
                    if (this.props.signUpData) {
                      this.props.history.push("/login");
                    }
                  });
              })
              .catch((error) => console.log(error));
          }
        );
    } else {
      if (values.avatar !== this.props.profileData?.avatar) {
        firebaseStorage
          .ref(`/images/${values.avatar.name}`)
          .put(values.avatar)
          .on(
            "state_changed",
            (snapShot) => {},
            (err) => {},
            () => {
              firebaseStorage
                .ref("images")
                .child(values.avatar.name)
                .getDownloadURL()
                .then((fireBaseUrl) => {
                  this.props
                    .updateProfileThunk({
                      user: this.props?.user && this.props.user,
                      signUpdata: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        age: values.age,
                        phone: values.phone,
                        address: values.address,
                        avatar: fireBaseUrl,
                      },
                    })
                    .then(() => {
                      if (this.props.updateProfileSuccess) {
                        this.props
                          .profileThunk({
                            user: this.props?.user && this.props.user,
                          })
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
                                avatar: profileData.avatar,
                              };
                              this.setState({
                                initialState: data,
                              });
                            }
                          });
                      }
                    });
                })
                .catch((error) => console.log(error));
            }
          );
      } else {
        this.props
          .updateProfileThunk({
            user: this.props?.user && this.props.user,
            signUpdata: {
              firstName: values.firstName,
              lastName: values.lastName,
              age: values.age,
              phone: values.phone,
              address: values.address,
              avatar: values.avatar,
            },
          })
          .then(() => {
            if (this.props.updateProfileSuccess) {
              this.props
                .profileThunk({
                  user: this.props?.user && this.props.user,
                })
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
                      avatar: profileData.avatar,
                    };
                    this.setState({
                      initialState: data,
                    });
                  }
                });
            }
          });
      }
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
              // firstName: Yup.string().required("Please provide firstName"),
              // lastName: Yup.string().required("Please provide lastname"),
              // age: Yup.number().required("Please provide age"),
              // email: Yup.string().required("Please provide email"),
              // password:
              //   this.props.profile === "/profile"
              //     ? Yup.string()
              //     : Yup.string()
              //         .required("No password provided")
              //         .min(8, "Password must be 8 characters long"),
              // address: Yup.string().required("Please provide address"),
              // phone: Yup.number().required("Please provide number"),
            })}
            onSubmit={(values, { resetForm }) => {
              if (this.props.profile === "/profile") {
                this.handleSubmitHandler(values, resetForm, "update");
              } else {
                this.handleSubmitHandler(values, resetForm, "add");
              }
            }}
          >
            {({
              errors,
              setFieldValue,
              handleSubmit,
              values,
              handleChange,
            }) => (
              <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <input
                  type="file"
                  name="avatar"
                  onChange={(event) => {
                    setFieldValue(
                      "avatar",
                      event.currentTarget.files.length !== 0
                        ? event.currentTarget.files[0]
                        : values.avatar
                    );
                  }}
                ></input>
                {}
                {this.props.profile === "/profile" && (
                  <img
                    src={values.avatar}
                    alt="avatar"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  ></img>
                )}

                <FirstRow>
                  <Field
                    id="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    style={{
                      margin: "0 0 1rem 0",
                    }}
                  />

                  <Field
                    id="outlined-basic"
                    name="lastName"
                    variant="outlined"
                    label="Last name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    style={{
                      margin: "0 0 1rem 0",
                    }}
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
                      margin: "0 0 1rem 0",
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
  signUpData: state.signUp.signUpSuccess,
  imageUrl: state.profile.uploadImageSuccess,
  updateProfileSuccess: state.profile.updateProfileSuccess,
});

export default withRouter(
  connect(mapStateToProps, {
    userLogoutThunk,
    signUpThunk,
    profileThunk,
    updateProfileThunk,
    uploadImageThunk,
  })(Signup)
);
