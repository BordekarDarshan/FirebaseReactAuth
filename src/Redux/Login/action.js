import { auth } from "../../Firebase/Firebase";
export const loginActions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  USER_LOGOUT: "USER_LOGOUT",
  USER_LOGOUT_ERROR: "USER_LOGOUT_ERROR",
};

export function loginSuccess(props) {
  return (dispatch) => {
    dispatch({
      type: loginActions.LOGIN_SUCCESS,
      payload: props,
    });
  };
}

export function loginError(error) {
  return {
    type: loginActions.LOGIN_ERROR,
    payload: error,
  };
}

export function loginThunk(props) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(props.email, props.password)
        .then((data) => {
          if (auth.currentUser) {
            dispatch(loginSuccess(data));
            resolve(data);
          }
        })
        .catch((error) => {
          dispatch(loginError(error));
          reject(error);
        });
    });
  };
}

export function userLogout() {
  return {
    type: loginActions.USER_LOGOUT,
  };
}

export function userLogoutError(props) {
  return {
    type: loginActions.USER_LOGOUT_ERROR,
    payload: props,
  };
}

export function userLogoutThunk() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          dispatch({ type: loginActions.USER_LOGOUT });
          resolve("Logged Out");
        })
        .catch((error) => {
          dispatch(userLogoutError(error));
          reject(error);
        });
    });
  };
}
