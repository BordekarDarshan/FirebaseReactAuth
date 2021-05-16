import { auth, db } from "../../Firebase/Firebase";
export const signUpActions = {
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR: "SIGN_UP_ERROR",
};

export function signUpSuccess(props) {
  return (dispatch) => {
    dispatch({
      type: signUpActions.SIGN_UP_SUCCESS,
      payload: props,
    });
  };
}

export function signUpError(error) {
  return {
    type: signUpActions.SIGN_UP_ERROR,
    payload: error,
  };
}

export function signUpThunk(props) {
  return async (dispatch) => {
    let response = auth.createUserWithEmailAndPassword(
      props.email,
      props.password
    );
    console.log(response);
    if (response) {
      let success = db.collection("users").doc(auth.currentUser.uid).set({
        id: auth.currentUser.uid,
        firstName,
        lastName,
        email,
        phone,
        age,
        address,
      });
      if (success) {
        dispatch(signUpSuccess(success));
      } else {
        dispatch(signUpError("Sign Up Failed"));
      }
    }
  };
}
