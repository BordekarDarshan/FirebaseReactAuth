import { loginActions } from "../Login/action";
import { signUpActions } from "./action";

let initial_state = {
  signUpSuccess: null,
  signUpError: null,
};

export const signUpReducer = (state = initial_state, action) => {
  switch (action.type) {
    case signUpActions.SIGN_UP_SUCCESS:
      return {
        signUpSuccess: action.payload,
        signUpError: null,
      };
    case signUpActions.SIGN_UP_ERROR:
      return {
        signUpSuccess: null,
        signUpError: action.payload,
      };
    case loginActions.USER_LOGOUT:
      return {
        ...initial_state,
      };
    default:
      return state;
  }
};
