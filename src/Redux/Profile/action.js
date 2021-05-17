import { db, firebaseStorage } from "../../Firebase/Firebase";
export const profileActions = {
  FETCH_PROFILE_SUCCESS: "FETCH_PROFILE_SUCCESS",
  FETCH_PROFILE_ERROR: "FETCH_PROFILE_ERROR",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",
  AVATAR_UPLOAD_SUCCESS: "AVATAR_UPLOAD_SUCCESS",
  AVATAR_UPLOAD_ERROR: "AVATAR_UPLOAD_ERROR",
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

// Update user information.

export function updateProfileSuccess(props) {
  return (dispatch) => {
    dispatch({
      type: profileActions.UPDATE_PROFILE_SUCCESS,
      payload: props,
    });
  };
}

export function updateProfileError(error) {
  return {
    type: profileActions.UPDATE_PROFILE_ERROR,
    payload: error,
  };
}

export function updateProfileThunk(props) {
  return async (dispatch) => {
    await db
      .collection("users")
      .doc(props.user)
      .update({
        ...props.signUpdata,
      })
      .then(() => {
        dispatch(updateProfileSuccess("Data updated successfully"));
      })
      .catch((error) => dispatch(updateProfileError(error)));
  };
}

// Upload user Image.

export function uploadImageSuccess(props) {
  return (dispatch) => {
    dispatch({
      type: profileActions.AVATAR_UPLOAD_SUCCESS,
      payload: props,
    });
  };
}

export function uploadImageError(error) {
  return {
    type: profileActions.AVATAR_UPLOAD_ERROR,
    payload: error,
  };
}

export function uploadImageThunk(props) {
  return (dispatch) => {
    firebaseStorage
      .ref(`/images/${props.imageAsFile.name}`)
      .put(props.imageAsFile)
      .on(
        "state_changed",
        (snapShot) => {
          console.log(snapShot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          firebaseStorage
            .ref("images")
            .child(props.imageAsFile.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              console.log(fireBaseUrl);
              dispatch(uploadImageSuccess(fireBaseUrl));
            })
            .catch((error) => dispatch(uploadImageError(error)));
        }
      );
  };
}
