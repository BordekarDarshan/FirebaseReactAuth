import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./Login/reducer";
import { signUpReducer } from "./SignUp/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const persistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["login", "signUp"],
};

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [logger, thunk];
export const reduxStore = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
export const PersistStore = persistStore(reduxStore);
