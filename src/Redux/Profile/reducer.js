import { loginActions } from "../Login/action";
import { profileActions } from "./action";

let initial_state = {
  profileSuccess: null,
  profileError: null,
  updateProfileSuccess: null,
  updateProfileError: null,
};

export const profileReducer = (state = initial_state, action) => {
  switch (action.type) {
    case profileActions.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profileSuccess: action.payload,
        profileError: null,
      };
    case profileActions.FETCH_PROFILE_ERROR:
      return {
        ...state,
        profileSuccess: null,
        profileError: action.payload,
      };
    case profileActions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: action.payload,
        updateProfileError: null,
      };
    case profileActions.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateProfileSuccess: null,
        updateProfileError: action.payload,
      };
    case loginActions.USER_LOGOUT:
      return {
        ...initial_state,
      };
    default:
      return state;
  }
};
