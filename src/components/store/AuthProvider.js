import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,  
  onValidSession: () => {},
});

export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginTmpHandler = () => {
    setIsLoggedIn(true);
    console.log("estado de la flag isLoggedIn: " + isLoggedIn);
  }

  const contextValue = {
    onValidSession: loginTmpHandler,
  };

  return(
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;