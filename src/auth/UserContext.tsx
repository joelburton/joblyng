import React from "react";
import {IUserContext} from "../interfaces";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<IUserContext>(undefined!);

export default UserContext;
