import React, { useContext, Fragment } from "react";
import HeaderButton from "../UI/Buttons/HeaderButton";
import AuthContext from "../store/auth-context";
import classes from "./Header.module.css";

const ButtonsContainer = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <nav className={classes.nav}>
        {authCtx.isLoggedIn ? (
          <div className={classes.btncontainer}>
            <HeaderButton
              onClick={props.onRequestLogout}
              userIcon={1}
              requestedLabel="Logout"
            />
          </div>
        ) : (
          <div className={classes.btncontainer}>
            <HeaderButton
              onClick={props.onShowLogin}
              userIcon={1}
              requestedLabel="Login"
            />
            <HeaderButton
              onClick={props.onShowSignup}
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
