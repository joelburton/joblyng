import React from "react";
import { IUser } from "../api/api";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<{
    currUser: IUser | null,
    setCurrUserResponse: any,
    hasAppliedToJob: any,
    applyToJob: any,
}>({currUser: null, setCurrUserResponse: null, hasAppliedToJob: null, applyToJob: null});

export default UserContext;
