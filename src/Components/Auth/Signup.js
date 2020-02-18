import React from "react";
import { connect } from "react-redux";
import { register } from "../../Redux/Reducers/authReducer";
import { Redirect, Link } from "react-router-dom";
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

  async function registerUser(e) {
    // props.login(username, password);
    e.preventDefault();
    const signUpResponse = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });
    props.register(signUpResponse);
    console.log(signUpResponse);
  }

  // if (user && user.loggedIn) return <Redirect to="/" />;
  if (user && user.registered)
    return (
      <div id="welcome-wrapper">
        <h2>Welcome!</h2>
        <p>You have successfully registered a new account!</p>
        <p>Please confirm your email address before logging in.</p>
      </div>
    );
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
            // maxLength="12"
            // minLength="1"
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
            // maxLength="10"
            // minLength="1"
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
            onClick={e => registerUser(e)}
          >
            Register
          </button>
          <Link to="/login">
            <button type="button" className="cancel-button">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { register })(Signup);
