import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Alert from "../common/Alert";
import {IAuthCredential} from "../interfaces";
import UserContext from "./UserContext";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm() {
    const history = useHistory();
    const [formData, setFormData] = useState<IAuthCredential>({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const { login } = useContext(UserContext);

    console.info("* LoginForm", "login=", typeof login);
    // console.info("* LoginForm", "login=", typeof login, "formData=", formData, "formErrors=", formErrors);

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();
        console.info("> LoginForm.handleSubmit formData=", formData, "formErrors=", formErrors);
        try {
            await login(formData);
            // XXX: we stopped teaching history.push, but wow, this is far less painful than
            // fucking around with state to redirect
            history.push("/companies");
        } catch (err: any) {
            setFormErrors(err);
        }
    }

    /** Update form user field */
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = evt.target;
        setFormData(l => ({...l, [name]: value}));
    }

    return (
        <div className="LoginForm">
            <div
                className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
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
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formErrors.length > 0 &&
                            <Alert type="danger" messages={formErrors} />
                            }

                            <button className="btn btn-primary float-right">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
