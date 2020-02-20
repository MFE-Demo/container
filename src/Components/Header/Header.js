import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";
import { logout } from "../../Redux/Reducers/authReducer";

import "./Header.css";

function Header(props) {
  let { user } = props;
  console.log(props);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const logoutUser = () => {
    Auth.signOut();
    props.logout();
  };

  return (
    <header className="header-wrapper">
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
            </li>
          ) : null}
          {user && user.loggedIn ? (
            <>
              <li>
                <NavLink to="/account">Account</NavLink>
              </li>
              <li>
                <NavLink to="/mylist">My List</NavLink>
              </li>
            </>
          ) : null}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            {user && user.loggedIn ? (
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
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
