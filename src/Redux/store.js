import { combineReducers, createStore, applyMiddleware } from "redux";
import { loginReducer } from "./Login/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

export const persistConfig = {
  key: "user",
  storage,
  whitelist: ["login"],
};

const rootReducer = combineReducers({ login: loginReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const reduxStore = createStore(persistedReducer, applyMiddleware(thunk));
export const PersistStore = persistStore(reduxStore);
