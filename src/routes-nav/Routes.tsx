import React, {useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import Homepage from "../homepage/Homepage";
// import CompanyList from "../companies/CompanyList";
// import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import CompanyPage from "../companies/CompanyPage";
import {AuthCredential} from "../api/api";
import UserContext from "../auth/UserContext";
import CompanyList from "../companies/CompanyListPage";
// import ProfileForm from "../profiles/ProfileForm";
// import SignupForm from "../auth/SignupForm";
// import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }: { login: (arg0: AuthCredential) => void, signup: () => void}) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `signup=${typeof signup}`,
  );

  const { currUser } = useContext(UserContext);

    return (
      <div className="pt-5">
        <Switch>

          {/*<Route exact path="/">*/}
          {/*  <Homepage />*/}
          {/*</Route>*/}

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          {/*<Route exact path="/signup">*/}
          {/*  <SignupForm signup={signup} />*/}
          {/*</Route>*/}

            {currUser &&
            <Route exact path="/companies">
              <CompanyList />
            </Route>
            }

          {/*<PrivateRoute exact path="/jobs">*/}
          {/*  <JobList />*/}
          {/*</PrivateRoute>*/}


          {currUser &&
          <Route exact path="/companies/:handle">
            <CompanyPage />
          </Route>
          }

          {/*<PrivateRoute path="/profile">*/}
          {/*  <ProfileForm />*/}
          {/*</PrivateRoute>*/}

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
