import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../Redux/Reducers/authReducer";

import "./Header.css";

function Header(props) {
  let { user } = props;
  console.log(user);

  return (
    <header>
      <div className="center-column">
        <NavLink id="main-header" to="/">
          <h1>
            <i className="fas fa-film" style={{ marginRight: "8px" }} />
            flickFinder
          </h1>
        </NavLink>
      </div>
      <nav>
        <ul className="center-column">
          {user && user.loggedIn ? (
            <li id="profile-container">
              <img id="profile-img" src={user.profilePic} alt="Avatar" />
              {user.username}
            </li>
          ) : null}

          <li>
            {user && user.loggedIn ? (
              <NavLink to="/" onClick={props.logout}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </li>
          {user && user.loggedIn ? (
            <li>
              <NavLink to="mylist">My List</NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { logout })(Header);
