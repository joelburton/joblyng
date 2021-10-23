import React from "react";
import { IUser } from "../interfaces";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<{
    currUser: IUser | null,
    updateProfile: any,
    hasAppliedToJob: any,
    applyToJob: any,
    signup: any,
    login: any,
    logout: any,
}>({currUser: null, updateProfile: null, hasAppliedToJob: null, applyToJob: null, signup: null, login: null, logout: null});

export default UserContext;
