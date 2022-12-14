import React, { useState, useEffect } from "react";
import AuthContext from "./auth-context";

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSokActiveSession = localStorage.getItem('sokLoggedIn');
    if (checkSokActiveSession === '1') {
      setIsLoggedIn(true);
    }
  }, []);


  const logoutHandler = () => {
    localStorage.removeItem("sokLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("sokLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onValidSession: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
