import React, { useEffect } from "react";
import "./Auth.css";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";

function ForgotPassword() {
  const [verificationCode, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPass1, setNewPass1] = React.useState("");
  const [newPass2, setNewPass2] = React.useState("");
  const [pwsMatch, setMatching] = React.useState(false);

  useEffect(() => {
    if (newPass1 === newPass2) {
      setMatching(true);
    } else if (newPass1 !== newPass2) {
      setMatching(false);
    }
  }, [newPass1, newPass2]);

  async function sendResetRequest(e) {
    e.preventDefault();
    if (pwsMatch) {
      await Auth.forgotPasswordSubmit(email, verificationCode, newPass2);
    } else console.log("No match on pws");
  }

  return (
    <section className="parent-container">
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}
        >
          {/* <h2>Set new password</h2> */}
          <p>
            Please enter the verification code sent to your email address along
            with your email address and a new password.
          </p>
        </div>
        <div className="input-container">
          <label>
            <b>Verification Code:</b>
          </label>
          <input
            className="auth-input"
            type="text"
            value={verificationCode}
            placeholder="Enter code"
            onChange={e => setCode(e.target.value)}
          />
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
          <label>
            <b>New Password:</b>
          </label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={newPass1}
            onChange={e => setNewPass1(e.target.value)}
            required
          />
          <label>
            <b>Confirm Password:</b>
          </label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={newPass2}
            onChange={e => setNewPass2(e.target.value)}
            required
          />
          <button
            type="submit"
            className="login-button"
            onClick={e => sendResetRequest(e)}
            // disabled
          >
            Send reset link
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPassword;
