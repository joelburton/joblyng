import React, {useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import UserContext from "../auth/UserContext";
import LoginPage from "../auth/LoginPage";
import CompanyPage from "../companies/CompanyPage";
import CompanyListPage from "../companies/CompanyListPage";
import ProfileEditPage from "../profiles/ProfileEditPage";
import SignupPage from "../auth/SignupPage";
import JobListPage from "../jobs/JobListPage";
import HomePage from "../homepage/HomePage";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

function Routes() {
  const {user} = useContext(UserContext);
  console.info("* Routes user=", user);

  return (
      <Switch>
        <Route exact path="/"><HomePage /></Route>
        <Route exact path="/login"><LoginPage /></Route>
        <Route exact path="/signup"><SignupPage /></Route>
        {user && <>
          <Route exact path="/companies"><CompanyListPage /></Route>
          <Route exact path="/jobs"><JobListPage /></Route>
          <Route exact path="/companies/:handle"><CompanyPage /></Route>
          <Route exact path="/profile"><ProfileEditPage /></Route>
        </>}
        <Redirect to="/" />
      </Switch>
  );
}

export default Routes;
