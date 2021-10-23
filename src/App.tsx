import React, {useEffect, useState} from 'react';
import jwt from "jsonwebtoken";

import JoblyApi, {AuthCredential, IUser} from "./api/api";
import Navigation from "./routes-nav/Navigation";
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes-nav/Routes";
import UserContext from './auth/UserContext';
import LoadingSpinner from "./common/LoadingSpinner";

export const TOKEN_STORAGE_ID = "jobly-token";

interface CurrUserState {
    waiting: boolean;
    data: IUser | null;
    errors: string[] | null;
}

function App() {
    const [currUser, setCurrUser] = useState<CurrUserState>({
        waiting: true,
        data: null,
        errors: null
    });

    /** Given a token, retrieve user and update currUser state. */
    async function fetchUser(token: string) {
        console.log("App fetchUser", token);
        // @ts-ignore
        const username = jwt.decode(token)!.username;
        JoblyApi.token = token;
        const user = await JoblyApi.getCurrentUser(username);
        setCurrUser({waiting: false, data: user, errors: []});
    }

    /** Checks logging in via token in LS.
     *
     * If this isn't successful for any reason, mark currUser as no longer
     * waiting, which will allow app to render.
     */

    useEffect(function checkLocalStorageToken() {
            async function tryLocalStorageToken(token: string | null) {
                try {
                    await fetchUser(token!);
                } catch (errs: any) {
                    // might be an invalid token or network err
                    setCurrUser({waiting: false, data: null, errors: errs});
                }
            }

        const token = localStorage.getItem(TOKEN_STORAGE_ID);
        if (token) {
            console.log("meow", {token})
            tryLocalStorageToken(token)
        } else {
            // no token, so allow site to proceed w/o a user
            setCurrUser({waiting: false, data: null, errors: []});
        }
        }, []
    );


    async function login({username, password}: AuthCredential) {
        const token = await JoblyApi.login({username, password});
        localStorage.setItem(TOKEN_STORAGE_ID, token);
        await fetchUser(token);
    }

    function logout() {
        setCurrUser({waiting: false, data: null, errors: []});
        localStorage.setItem(TOKEN_STORAGE_ID, "");
    }

    if (currUser.waiting) return <LoadingSpinner />;

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider
                    value={{
                        currUser: currUser.data,
                    }}>
                    <Navigation logout={logout} />
                    <Routes login={login} signup={() => null} />
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
