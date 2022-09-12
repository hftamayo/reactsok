import React, { Fragment, useState } from "react";
import classes from "./Header.module.css";
import Buttons from "./Buttons";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import AuthProvider from "../store/AuthProvider";

const Header = () => {
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
    2. orders not place them
    */
    /*
    source code example:
      const authCtx = useContext(AuthContext);
      <Button onClick={authCtx.onLogout}>Logout</Button>
    */
  };

  return (
    <Fragment>
      <AuthProvider>
        {loginIsShown && <Login onClose={hideLoginHandler} />}
        {SignupIsShown && <Signup onClose={hideSignupHandler} />}
        <header className={classes["main-header"]}>
          <h1>Sotiria</h1>
          <Buttons
            onShowLogin={showLoginHandler}
            onShowSignup={showSignupHandler}
            onRequestLogout={requestLogoutHandler}
          />
        </header>
      </AuthProvider>
    </Fragment>
  );
};

export default Header;
