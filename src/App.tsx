import React, {useEffect, useState} from 'react';

import JoblyApi, {AuthCredential, ISignupData, IUser} from "./api/api";
import Navigation from "./routes-nav/Navigation";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes-nav/Routes";
import UserContext from './auth/UserContext';
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "jobly-token";


function App() {
    // This state is subtle: there are three possible values for {user: } ---
    //  - undefined: app is trying to log in w/localstorage token, if any
    //  - null: there is no logged in user
    //  - user obj
    const [currUserResponse, setCurrUserResponse] =
        useState<{user?: IUser | null, errors?: string[]}>(() => ({
            user: localStorage.getItem(TOKEN_STORAGE_ID) ? undefined : null
        }));

    console.log("* App", "currUserResponse=", currUserResponse);

    /** Checks logging in via token in LS.
     *
     * If this isn't successful for any reason, mark currUserResponse as no longer
     * waiting, which will allow app to render.
     */

    useEffect(function checkLocalStorageToken() {
        const token = localStorage.getItem(TOKEN_STORAGE_ID);
        console.info("& App.checkLocalStorageToken", "token=", token);

            async function tryLocalStorageToken() {
                console.info("& App.tryLocalStorageToken", "token=", token);
                try {
                    setCurrUserResponse({user: await JoblyApi.fetchUser(token!)});
                } catch (errs: any) {
                    // might be an invalid token or network err
                    setCurrUserResponse({errors: errs});
                }
            }

            if (token) { // noinspection JSIgnoredPromiseFromCall
                tryLocalStorageToken()
            }
        }, []
    );

    /** Log in user; if successful, set user and put token in localStorage.
     *
     * Throws error if invalid; call can catch this to provide UI for error.
     */
    async function login({username, password}: AuthCredential) {
        const token = await JoblyApi.login({username, password});
        localStorage.setItem(TOKEN_STORAGE_ID, token);
        setCurrUserResponse({user: await JoblyApi.fetchUser(token!)});
    }

    /** Set current user to null and remove localStorage token. */
    function logout() {
        setCurrUserResponse({user: null});
        localStorage.removeItem(TOKEN_STORAGE_ID);
    }

    /** LSign up user; if successful, set user and put token in localStorage.
     *
     * Throws error if invalid; call can catch this to provide UI for error.
     */
    async function signup(userData: ISignupData) {
        const token = await JoblyApi.signup(userData);
        localStorage.setItem(TOKEN_STORAGE_ID, token);
        setCurrUserResponse({user: await JoblyApi.fetchUser(token!)});
    }

    function hasAppliedToJob(jobId: number) : boolean {
        console.debug(jobId);
        return true; // TODO
    }

    function applyToJob(jobId: number) {
        console.debug(jobId);
    }

    // In process of trying localStorage token; so don't proceed until done.
    if (currUserResponse.user === undefined) return <LoadingSpinner />;

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider
                    value={{
                        currUser: currUserResponse.user!,
                        setCurrUserResponse,
                        hasAppliedToJob,
                        applyToJob,
                    }}>
                    <Navigation logout={logout} />
                    <Routes login={login} signup={signup} />
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
