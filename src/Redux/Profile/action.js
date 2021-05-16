import { db } from "../../Firebase/Firebase";
export const profileActions = {
  FETCH_PROFILE_SUCCESS: "FETCH_PROFILE_SUCCESS",
  FETCH_PROFILE_ERROR: "FETCH_PROFILE_ERROR",
};

export function profileSuccess(props) {
  return (dispatch) => {
    dispatch({
      type: profileActions.FETCH_PROFILE_SUCCESS,
      payload: props,
    });
  };
}

export function profileError(error) {
  return {
    type: profileActions.FETCH_PROFILE_ERROR,
    payload: error,
  };
}

export function profileThunk(props) {
  return async (dispatch) => {
    await db
      .collection("users")
      .doc(props.user)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(profileSuccess(doc.data()));
        } else {
          dispatch(profileError("No data found!"));
        }
      })
      .catch((error) => dispatch(profileError(error)));
  };
}
