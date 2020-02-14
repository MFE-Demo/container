import axios from "axios";
import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  user: {}
};

export const login = (username, password) => {
  let data = axios
    .post("/api/login", { username, password })
    .then(res => res.data);
  return {
    type: LOGIN,
    payload: data
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete("/api/logout")
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN + '_FULFILLED':
      return {
        ...state,
        user: payload,
      };
      case LOGIN + "_REJECTED":
        return { ...state, error: payload };
    case LOGOUT + '_FULFILLED':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}