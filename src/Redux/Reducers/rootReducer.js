import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
// import gameDataReducer from "./gameDataReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["entry"]
};

const rootReducer = combineReducers({
  user: authReducer
});

export default persistReducer(persistConfig, rootReducer);
