import React from "react";
import "./Account.css";
import { connect } from "react-redux";

function Account(props) {
  const { user, profilePic } = props.user;
  return (
    <div id="account">
      <img
        src={profilePic}
        alt="profile art"
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "50%",
          border: "1px solid yellowgreen"
        }}
      />
      <div>
        <h2>Username: {user.username}</h2>
        <h2>Email: {user.attributes.email}</h2>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(Account);
