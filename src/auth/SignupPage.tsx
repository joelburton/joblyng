import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Alert from "../common/Alert";
import {ISignupData} from "../interfaces";
import UserContext from "./UserContext";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupPage -> Alert
 * Routed as /signup
 */

function SignupPage() {
  const history = useHistory();
  const [formData, setFormData] = useState<ISignupData>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const {signup} = useContext(UserContext);

  console.info(
      "SignupPage",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      await signup!(formData);
      history.push("/companies");
    } catch (errors: any) {
      setFormErrors(errors);
    }
  }

  /** Update form data field */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = evt.target;
    setFormData(data => ({...data, [name]: value}));
  }

  return (
      <main className="SignupPage col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <section className="card">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>First name</label>
              <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last name</label>
              <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null
            }

            <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </section>
      </main>
  );
}

export default SignupPage;