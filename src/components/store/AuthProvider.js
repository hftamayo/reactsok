import React, { useState } from 'react';
import AuthContext from "./auth-context";


export const AuthProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginTmpHandler = () => {
    setIsLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem("sokLoggedIn");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
         onValidSession: loginTmpHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;