import React from "react";
import {IUserContext} from "../interfaces";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext<IUserContext>({
  user: null,
});

export default UserContext;
