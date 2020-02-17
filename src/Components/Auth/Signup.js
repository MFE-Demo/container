import React from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/Reducers/authReducer";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./Auth.css";

export function Signup(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [confirmationCode, setConfirmation] = React.useState("");
  const [signedUp, setSignedUp] = React.useState(false);

  let { user } = props;

  function loginUser(e) {
    props.login(username, password);
    e.preventDefault();
  }

  if (user && user.loggedIn) return <Redirect to="/" />;
  return (
    <div className="parent-container">
      <form>
        <div className="input-container">
          <label>
            <b>Username:</b>
          </label>
          <input
            className="auth-input"
            type="text"
            value={username}
            placeholder="Enter Username"
            maxLength="12"
            minLength="1"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label>
            <b>Password:</b>
          </label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            maxLength="10"
            minLength="1"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label>
            <b>Email:</b>
          </label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>
            <b>Phone Number:</b>
          </label>
          <input
            className="auth-input"
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
          <button
            type="submit"
            className="login-button"
            onClick={e => loginUser(e)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(Signup);
