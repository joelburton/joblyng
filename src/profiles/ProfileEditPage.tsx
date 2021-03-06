import React, {useState, useContext} from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import {IProfileRead, IProfileWrite} from "../interfaces";

// eslint-disable-next-line
// import useTimedMessage from "../hooks/useTimedMessage";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileEditPage() {
  const {user, updateProfile} = useContext(UserContext);

  // this assertion protects from having to say "user!" everywhere --- but it
  // might be better with those? or...?
  if (user === null) throw Error();

  const [formData, setFormData] = useState<IProfileRead>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", user,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    const {username, firstName, lastName, email, password}:
        IProfileRead = formData;
    const profileData: IProfileWrite = {firstName, lastName, email, password};

    try {
      await updateProfile(username, profileData);
    } catch (errors: any) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({...f, password: ""}));
    setFormErrors([]);
    setSaveConfirmed(true);
  }

  /** Handle form data changing */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <main
          className="ProfileEditPage col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <section className="card">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
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
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
              />
            </div>

            {formErrors.length
                ? <Alert type="danger" messages={formErrors} />
                : null}

            {saveConfirmed
                ? <Alert type="success" messages={["Updated."]} />
                : null}

            <button className="btn btn-primary btn-block mt-4">
              Save Changes
            </button>
          </form>
        </section>
      </main>
  );
}

export default ProfileEditPage;
