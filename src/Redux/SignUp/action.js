import { auth, db } from "../../Firebase/Firebase";
export const signUpActions = {
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR: "SIGN_UP_ERROR",
};

// User Registration

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
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(
          props.signUpdata.email,
          props.signUpdata.password
        )
        .then((data) => {
          db.collection("users")
            .doc(auth.currentUser.uid)
            .set({
              id: auth.currentUser.uid,
              ...props.signUpdata,
            })
            .then(() => {
              dispatch(signUpSuccess(data));
              resolve(data);
            })
            .catch((error) => {
              dispatch(signUpError(error));
              reject(error);
            });
        })
        .catch((error) => {
          dispatch(signUpError(error));
          reject(error);
        });
    });
  };
}
