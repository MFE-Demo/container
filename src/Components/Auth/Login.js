import React from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/Reducers/authReducer";
import { Redirect } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import "./Auth.css";
import aws_exports from "../../aws-exports";
Amplify.configure(aws_exports);

export function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  let { user } = props;

  async function loginUser(e) {
    e.preventDefault();
    // props.login(username, password);

    const signInResponse = await Auth.signIn({
      username,
      password
    });
    props.login(signInResponse);

    // console.log("Sign in response: ", signInResponse);

    console.log(props);
  }

  if (user.length) {
    console.log("USER", user);
  }
  if (user && user.loggedIn) return <Redirect to="/" />;
  return (
    <div className="parent-container">
      <form>
        <div className="input-container">
          <div className="field">
            <label>
              <b>Username:</b>
            </label>
            <p className="control has-icons-left">
              <input
                className="input"
                id="username"
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={e => setUsername(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <label>
              <b>Password:</b>
            </label>
            <p className="control has-icons-left">
              <input
                className="input"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={e => loginUser(e)}
          >
            Login
          </button>
          <section id="auth-bottom">
            <div>
              Not a member? <a href="/signup">Sign Up</a>
            </div>
            <div>
              <a href="/forgot">Forgot your password?</a>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(Login);
