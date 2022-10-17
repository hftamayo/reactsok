import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,  
  onValidSession: () => {},
});

export default AuthContext;