import axios from "axios";
import { LOGIN, LOGOUT, REGISTER } from "../actionTypes";
import { Auth } from "aws-amplify";

const initialState = {
  user: {},
  registered: false
};

export const login = activeUser => {
  const user = {
    user: activeUser,
    profilePic: `https://robohash.org/${activeUser.username}`,
    loggedIn: true
  };
  return {
    type: LOGIN,
    payload: user
  };
};

export const register = activeUser => {
  const user = {
    registered: true
  };

  return {
    type: REGISTER,
    payload: user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export default function(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload
      };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case REGISTER:
      return {
        ...state,
        user: payload
      };
    case LOGOUT:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}
