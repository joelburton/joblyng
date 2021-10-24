import React, {useContext} from "react";
import UserContext from "../auth/UserContext";
import {Link, NavLink} from "react-router-dom";
import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation() {
  const {user, logout} = useContext(UserContext);
  console.info("* Navigation", "user=", user);

  function loggedInNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/companies">Companies</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={logout}>
              Log out {user!.firstName || user!.username}
            </Link>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item mr-4">
            <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav className="Navigation navbar navbar-expand-md mb-5">
        <Link className="navbar-brand" to="/">Jobly</Link>
        {user ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;
