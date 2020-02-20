import React from "react";
import "./Auth.css";
import Validate from "./utility/FormValidation";
import FormErrors from "./utility/FormErrors";
import ForgotPasswordReset from "./ForgotPasswordReset";
import { Auth } from "aws-amplify";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const [resetting, setResetting] = React.useState("");
  const [errors, setErrors] = React.useState({
    cognito: null,
    blankfield: false,
    passwordmatch: false
  });

  function clearErrors() {
    setErrors({
      cognito: null,
      blankfield: false,
      passwordmatch: false
    });
  }

  async function sendResetRequest(e) {
    e.preventDefault();
    clearErrors();
    const error = Validate(e, errors);
    if (error) {
      setErrors({ ...errors, ...error });
    }
    try {
      let response = await Auth.forgotPassword(email);
      console.log(response);
      setResetting(true);
    } catch (error) {
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      setErrors({ ...errors, cognito: err });
    }
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
          <FormErrors formerrors={errors} />
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
