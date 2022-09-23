import React, { useContext, Fragment, useState } from "react";
import HeaderButton from "../UI/Buttons/HeaderButton";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import AuthContext from "../store/auth-context";
import classes from "./Header.module.css";

const ButtonsContainer = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

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
      <nav className={classes.nav}>
        {authCtx.isLoggedIn ? (
          <div className={classes.btncontainer}>
            <HeaderButton
              onClick={requestLogoutHandler}
              userIcon={1}
              requestedLabel="Logout"
            />
          </div>
        ) : (
          <div className={classes.btncontainer}>
            <HeaderButton
              onClick={showLoginHandler}
              userIcon={1}
              requestedLabel="Login"
            />
            <HeaderButton
              onClick={showSignupHandler}
              userIcon={2}
              requestedLabel="SignUp"
            />
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default ButtonsContainer;
