import { loginActions } from "./action";

let initial_state = {
  loginSuccess: null,
  loginError: null,
  isUserLoggedIn: false,
};

export const loginReducer = (state = initial_state, action) => {
  switch (action.type) {
    case loginActions.LOGIN_SUCCESS:
      return {
        loginSuccess: action.payload,
        loginError: null,
        isUserLoggedIn: true,
      };
    case loginActions.LOGIN_ERROR:
      return {
        loginSuccess: null,
        loginError: action.payload,
        isUserLoggedIn: false,
      };
    default:
      return state;
  }
};
