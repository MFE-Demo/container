import React from "react";
import "./Auth.css";
import ForgotPasswordReset from "./ForgotPasswordReset";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [resetting, setResetting] = React.useState("");

  async function sendResetRequest(e) {
    e.preventDefault();
    await Auth.forgotPassword(email);

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
          <label>
            <b>Email:</b>
          </label>
          <input
            className="auth-input"
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            required
          />
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
