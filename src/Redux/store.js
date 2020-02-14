import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./Reducers/rootReducer";

export const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware)
);

export const persistor = persistStore(store);

export default { store };
