import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./Login/reducer";
import { signUpReducer } from "./SignUp/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const persistConfig = {
  key: "user",
  storage,
  whitelist: ["login"],
};
const middlewares = [thunk, logger];
const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const reduxStore = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
export const PersistStore = persistStore(reduxStore);
