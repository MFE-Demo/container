import axios from "axios";
import { LOGIN, LOGOUT } from "../actionTypes";
import { Auth } from "aws-amplify";

const initialState = {
  user: {}
};

export const login = (username, password) => {
  // let data = axios
  //   .post("/api/login", { username, password })
  //   .then(res => res.data);
  // return {
  //   type: LOGIN,
  //   payload: data
  // };

  let data = Auth.signIn({
    username: username,
    password: password
  })
    .then(console.log(`${username} logged in!`))
    .catch(err => console.log(err));

  const user = {
    user: data,
    profilePic: `https://robohash.org/${data.username}`,
    loggedIn: true
  };
  console.log(data);

  return {
    type: LOGIN,
    payload: user
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
    case LOGIN:
      return {
        ...state,
        user: payload
      };
    case LOGIN + "_REJECTED":
      return { ...state, error: payload };
    case LOGOUT + "_FULFILLED":
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}
