import React from "react";
import "./Auth.css";
import ForgotPasswordReset from "./ForgotPasswordReset";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [resetting, setResetting] = React.useState("");

  async function sendResetRequest(e) {
    e.preventDefault();
    let response = await Auth.forgotPassword(email);

    console.log(response);

    setResetting(true);
  }

  if (!resetting) {
    return (
      <section
        className="parent-container"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 3px rgba(0, 0, 0, 0.2)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <h2>Forgot your password?</h2>
          <p>
            Please enter the email address linked to your account. We'll email
            you a password reset link!
          </p>
        </div>
        <div className="input-container">
          <div className="field">
            <label>
              <b>Email:</b>
            </label>
            <p className="control has-icons-left">
              <input
                className="input"
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={e => sendResetRequest(e)}
          >
            Send reset link
          </button>
        </div>
      </section>
    );
  }
  return <ForgotPasswordReset />;
}

export default ForgotPassword;
