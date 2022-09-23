import React, { Fragment, useContext, useState } from "react";
import classes from "./Header.module.css";
import ButtonsContainer from "./ButtonsContainer";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import AuthContext from "../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [SignupIsShown, setSignupIsShown] = useState(false);

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  const showSignupHandler = () => {
    setSignupIsShown(true);
  };

  const hideSignupHandler = () => {
    setSignupIsShown(false);
  };

  const requestLogoutHandler = () => {
    /*
    steps to consider:
    1. products in the cart
    2. orders not placed
    */
   authCtx.logout();
   
  };

  return (
    <Fragment>
        {loginIsShown && <Login onClose={hideLoginHandler} />}
        {SignupIsShown && <Signup onClose={hideSignupHandler} />}
        <header className={classes["main-header"]}>
          <h1>Sot1r1a</h1>
          <ButtonsContainer
            onShowLogin={showLoginHandler}
            onShowSignup={showSignupHandler}
            onRequestLogout={requestLogoutHandler}
          />
        </header>
    </Fragment>
  );
};

export default Header;
