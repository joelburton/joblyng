import React from "react";
import {
    IAuthCredential,
    IProfileWrite,
    ISignupData,
    IUser
} from "../interfaces";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<{
    currUser: IUser | null,
    updateProfile?: (username: string, profileData: IProfileWrite) => void,
    hasAppliedToJob?: (jobId: number) => boolean,
    applyToJob?: (jobId: number) => void,
    signup?: (userData: ISignupData) => void,
    login?: (arg0: IAuthCredential) => void,
    logout?: () => void,
}>({
    currUser: null,
});

export default UserContext;
