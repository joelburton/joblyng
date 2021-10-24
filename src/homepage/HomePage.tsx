import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./HomePage.css";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function HomePage() {
  const {user} = useContext(UserContext);
  console.info("* Homepage", "currentUser=", user);

  return (
      <main className="HomePage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Jobly</h1>
          <p className="lead">All the jobs in one, convenient place.</p>
          {user
              ? (
                  <h2>Welcome Back, {user.firstName || user.username}!</h2>
              ) : (
                  <p>
                    <Link
                        className="btn btn-primary font-weight-bold mr-3"
                        to="/login">
                      Log in
                    </Link>
                    <Link
                        className="btn btn-primary font-weight-bold"
                        to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </main>
  );
}

export default HomePage;
