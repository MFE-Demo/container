import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["entry"]
};

const rootReducer = combineReducers({
  user: authReducer
});

export default persistReducer(persistConfig, rootReducer);
