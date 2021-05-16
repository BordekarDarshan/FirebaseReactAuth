import { auth } from "../../Firebase/Firebase";
export const loginActions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
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
  return async (dispatch) => {
    let response = await auth.signInWithEmailAndPassword(
      props.email,
      props.password
    );
    if (auth.currentUser) {
      dispatch(loginSuccess(response));
    } else {
      dispatch(loginError("Login Failed"));
    }
  };
}
