import { useReducer, useEffect, useState } from "react";
import AuthContext from "./auth-context";

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      //sin el uso de useEffect, el chequeo de esta flag sería infinito
      //la funcion es ejecutada DESPUES que el componente ha sido re-evaluado
      const storeUserLoggedInInfo = localStorage.getItem('isLoggedIn');
      if (storeUserLoggedInInfo === '1') {
        setIsLoggedIn(true);
      }
    }, []);
  
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('sokActiveUser');
        setIsLoggedIn(false);
    };
  
    const loginHandler = () => {
      localStorage.setItem('isLoggedIn', '1');
      setIsLoggedIn(true);
    };

    //handler temporal
    const initValidSessionHandler = (userName) => {
      localStorage.setItem('sokActiveUser', userName);
      localStorage.setItem('isLoggedIn', '1');      
        setIsLoggedIn(true);
    }
  
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
          onLogin: loginHandler,
          onValidSession: initValidSessionHandler,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
export default AuthProvider;
 