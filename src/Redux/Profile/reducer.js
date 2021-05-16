import { profileActions } from "./action";

let initial_state = {
  profileSuccess: null,
  profileError: null,
};

export const profileReducer = (state = initial_state, action) => {
  switch (action.type) {
    case profileActions.FETCH_PROFILE_SUCCESS:
      return {
        profileSuccess: action.payload,
        profileError: null,
      };
    case profileActions.FETCH_PROFILE_ERROR:
      return {
        profileSuccess: null,
        profileError: action.payload,
      };
    default:
      return state;
  }
};
