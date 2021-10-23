import React, {useEffect, useState} from 'react';

import JoblyApi from "./api/api";
import {IAuthCredential, IProfileWrite, ISignupData, IUser} from "./interfaces";
import UserContext from './auth/UserContext';
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApp from "./JoblyApp";

export const TOKEN_STORAGE_ID = "jobly-token";


// noinspection JSIgnoredPromiseFromCall
/** App is just about authentication & providing user info. Perhaps this should
 * have a better name? And then App would render this?
 */


// could separate the "token" LS stuff to a separate component, passing token down?


function App() {
    // This state is subtle: there are three possible values for {user: } ---
    //  - undefined: app is trying to log in w/localstorage token, if any
    //  - null: there is no logged in user
    //  - user obj
    const [currUserResponse, setCurrUserResponse] =
        useState<{ user?: IUser | null, errors?: string[] }>(() => ({
            user: localStorage.getItem(TOKEN_STORAGE_ID) ? undefined : null
        }));

    console.info("* App", "currUserResponse=", currUserResponse);

    /** Checks logging in via token in LS.
     *
     * If this isn't successful for any reason, mark currUserResponse as no longer
     * waiting, which will allow app to render.
     */

    useEffect(function checkLocalStorageToken() {
            const token = localStorage.getItem(TOKEN_STORAGE_ID);
            console.info("& App.checkLocalStorageToken", "token=", token);
            if (token) {
                // noinspection JSIgnoredPromiseFromCall
                tryLocalStorageToken()
            }

            async function tryLocalStorageToken() {
                console.info("& App.tryLocalStorageToken", "token=", token);
                try {
                    setCurrUserResponse({user: await JoblyApi.fetchUser(token!)});
                } catch { // if can't use LS token, ignore and move on
                    setCurrUserResponse({user: null});
                }
            }
        }, []
    );

    /** Log in user; if successful, set user and put token in localStorage.
     *
     * Throws error if invalid; call can catch this to provide UI for error.
     */
    async function login({username, password}: IAuthCredential) {
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

    function hasAppliedToJob(jobId: number): boolean {
        return currUserResponse.user?.applications.includes(jobId) === true;
    }

    async function applyToJob(jobId: number) {
        await JoblyApi.applyToJob(currUserResponse.user!.username, jobId);
        setCurrUserResponse(ur => ({
            user: {
                ...ur.user!,
                applications: [...ur.user!.applications, jobId]
            }
        }));
    }

    async function updateProfile(username: string, profileData: IProfileWrite) {
        const user = await JoblyApi.saveProfile(username, profileData);
        setCurrUserResponse({user});
    }

    // In process of trying localStorage token; so don't proceed until done.
    if (currUserResponse.user === undefined) return <LoadingSpinner />;

    return (
        <div className="App">
            <UserContext.Provider
                value={{
                    currUser: currUserResponse.user!,
                    updateProfile,
                    hasAppliedToJob,
                    applyToJob,
                    signup,
                    login,
                    logout,
                }}>
                <JoblyApp />
            </UserContext.Provider>
        </div>
    );
}

export default App;
