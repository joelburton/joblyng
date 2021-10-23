import React, {useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import CompanyPage from "../companies/CompanyPage";
import UserContext from "../auth/UserContext";
import CompanyList from "../companies/CompanyListPage";
import ProfileForm from "../profiles/ProfileForm";
import SignupPage from "../auth/SignupPage";
import JobListPage from "../jobs/JobListPage";
import Homepage from "../homepage/Homepage";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

function Routes() {
  const { currUser } = useContext(UserContext);
  console.info("* Routes currUser=", currUser);

    return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path="/login">
            <LoginForm />
          </Route>

          <Route exact path="/signup">
            <SignupPage />
          </Route>

            {currUser &&
            <Route exact path="/companies">
              <CompanyList />
            </Route>
            }

          {currUser &&
          <Route exact path="/jobs">
            <JobListPage  />
          </Route>
          }

          {currUser &&
          <Route exact path="/companies/:handle">
            <CompanyPage />
          </Route>
          }

          {currUser &&
          <Route path="/profile">
            <ProfileForm />
          </Route>
          }

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
