import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (email, password, token) => {},  
  logout: () => {},
  onValidSession: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('sokToken');
  const storedExpirationDate = localStorage.getItem('sokExpirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if(remainingTime <= 3600){
    localStorage.removeItem('sokToken');
    localStorage.removeItem('sokExpirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if(tokenData){
    initialToken = tokenData.token;
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  
  const logoutHandler = useCallback(() => {
    localStorage.removeItem('sokToken');
    localStorage.removeItem('sokExpirationTime');
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    setIsLoggedIn(false);

    if(logoutTimer){
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('sokToken', token);
    localStorage.setItem('sokExpirationTime', expirationTime);
    localStorage.setItem('isLoggedIn', isLoggedIn);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const loginTmpHandler = () => {
    setIsLoggedIn(true);
  }

  useEffect(() => {
    if(tokenData){
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      setIsLoggedIn(true);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    onValidSession: loginTmpHandler,
  };

  return(
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;