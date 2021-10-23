import React from "react";
import { IUser } from "../api/api";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<{currUser: IUser | null}>({currUser: null});

export default UserContext;
