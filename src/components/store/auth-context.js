import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,  
  onValidSession: () => {},
  onLogout: () => {},
});

export default AuthContext;