import React, { Component } from "react";
import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button, CircularProgress } from "@material-ui/core";
import {
  Container,
  Field,
  FirstRow,
  SubmitWrapper,
  Wrapper,
  AvatarSection,
  LogoutBTN,
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
import signout from "../../Asset/Signout.png";
import { message, Popover } from "antd";

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
    loader: false,
    logoutLoader: false,
  };

  content = (<span>Changes will be reflected after saving the data</span>);

  fetchUserDataHandler = () => {
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
            loader: false,
          });
        }
      });
  };
  componentDidMount() {
    if (this.props.profile === "/profile") {
      this.fetchUserDataHandler();
    }
  }

  handleSubmitHandler = (values, type) => {
    this.setState({ loader: true });
    if (type === "add") {
      this.props
        .uploadImageThunk({ imageAsFile: values.avatar })
        .then(() => {
          if (this.props.imageUrl) {
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
                  avatar: this.props.imageUrl,
                },
              })
              .then(() => {
                this.setState({ loader: false });
                if (this.props.signUpData) {
                  this.props.history.push("/login");
                }
              })
              .catch((error) => {
                if (error.code === "auth/invalid-email") {
                  message.error("Please enter valid Email", 3);
                }
                if (error.code === "auth/email-already-in-use") {
                  message.error("Email already in use", 3);
                }
                this.setState({ loader: false });
              });
          }
        })
        .catch((error) => {
          this.setState({ loader: false });
          console.log(error);
        });
    } else {
      if (values.avatar !== this.props.profileData?.avatar) {
        this.props
          .uploadImageThunk({ imageAsFile: values.avatar })
          .then(() => {
            if (this.props.imageUrl) {
              this.props
                .updateProfileThunk({
                  user: this.props?.user && this.props.user,
                  signUpdata: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    age: values.age,
                    phone: values.phone,
                    address: values.address,
                    avatar: this.props.imageUrl,
                  },
                })
                .then(() => {
                  if (this.props.updateProfileSuccess) {
                    this.fetchUserDataHandler();
                  }
                });
            }
          })
          .catch((error) => {
            this.setState({ loader: false });
            console.log(error);
          });
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
              this.fetchUserDataHandler();
            }
          });
      }
    }
  };

  logoutHandler = () => {
    this.setState({ logoutLoader: true });
    this.props.userLogoutThunk().then(() => {
      this.setState({ logoutLoader: false });
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <>
        {this.props.profile === "/profile" && (
          <LogoutBTN
            variant="contained"
            color="primary"
            onClick={() => this.logoutHandler()}
            disabled={this.state.logoutLoader}
          >
            {this.state.logoutLoader || this.state.loader ? (
              <>
                <CircularProgress size={24} />
              </>
            ) : (
              <img alt="logout" src={signout}></img>
            )}
          </LogoutBTN>
        )}
        <Wrapper>
          <Container>
            <Formik
              enableReinitialize
              initialValues={this.state.initialState}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Please provide firstName"),
                lastName: Yup.string().required("Please provide lastname"),
                age: Yup.number().required("Please provide age"),
                email: Yup.string()
                  .email("Please provide valid email")
                  .required("Please provide email"),
                password:
                  this.props.profile === "/profile"
                    ? Yup.string()
                    : Yup.string()
                        .required("No password provided")
                        .min(8, "Password must be 8 characters long"),
                address: Yup.string().required("Please provide address"),
                phone: Yup.number().required("Please provide number"),
                avatar:
                  this.props.profile === "/profile"
                    ? Yup.string()
                    : Yup.string().required("Please choose your Avatar"),
              })}
              onSubmit={(values) => {
                if (this.props.profile === "/profile") {
                  this.handleSubmitHandler(values, "update");
                } else {
                  this.handleSubmitHandler(values, "add");
                }
              }}
            >
              {({
                errors,
                setFieldValue,
                handleSubmit,
                values,
                handleChange,
                touched,
              }) => (
                <form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <AvatarSection>
                    {this.props.profile === "/profile" &&
                      this.props.profileData?.avatar && (
                        <img
                          src={this.props.profileData?.avatar}
                          alt="avatar"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></img>
                      )}
                    <div className="upload-section">
                      <input
                        type="file"
                        name="avatar"
                        id="upload"
                        hidden
                        onChange={(event) => {
                          setFieldValue(
                            "avatar",
                            event.currentTarget.files.length !== 0
                              ? event.currentTarget.files[0]
                              : values.avatar
                          );
                        }}
                        error={errors.avatar}
                        accept="image/png, image/jpeg"
                      ></input>

                      <label htmlFor="upload">
                        {this.props.profile === "/profile"
                          ? `Update Avatar`
                          : `Choose Avatar`}
                      </label>
                      <span style={{ display: "flex" }}>
                        {values.avatar?.name}{" "}
                        {this.props.profile === "/profile" && (
                          <Popover content={this.content}>
                            <InfoOutlinedIcon style={{ margin: "0 5px" }} />
                          </Popover>
                        )}
                      </span>

                      {errors.avatar && touched.avatar && (
                        <div>
                          <span style={{ color: "red" }}>{errors.avatar}</span>
                        </div>
                      )}
                    </div>
                  </AvatarSection>

                  <FirstRow>
                    <Field
                      id="outlined-basic"
                      label="First name"
                      variant="outlined"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      error={errors.firstName && touched.firstName}
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
                      error={errors.lastName && touched.lastName}
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
                      error={errors.age && touched.age}
                      inputProps={{ maxLength: 3 }}
                    />

                    <Field
                      id="outlined-basic"
                      name="email"
                      variant="outlined"
                      label="Email"
                      value={values.email}
                      disabled={
                        this.props.profile === "/profile" ? true : false
                      }
                      onChange={handleChange}
                      style={{
                        margin: "0 0 1rem 0",
                      }}
                      error={errors.email && touched.email}
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
                    inputProps={{ maxLength: 10 }}
                    error={errors.phone && touched.phone}
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
                    error={errors.address && touched.address}
                  />
                  {this.props.profile !== "/profile" && (
                    <>
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
                        error={errors.password && touched.password}
                      />

                      <ErrorMessage name="password" />
                    </>
                  )}

                  <SubmitWrapper>
                    {this.props.profile === "/profile" ? (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={this.state.loader}
                        >
                          {this.state.loader ? (
                            <>
                              <CircularProgress size={24} />
                            </>
                          ) : (
                            `SAVE`
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={this.state.loader}
                        >
                          {this.state.loader ? (
                            <CircularProgress size={24} />
                          ) : (
                            `SIGN UP`
                          )}
                        </Button>

                        <span>
                          Already have an account?{" "}
                          <span
                            onClick={() => this.props.history.push("/login")}
                          >
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
      </>
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
