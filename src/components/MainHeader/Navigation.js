import React, { useContext } from "react";
import HeaderButton from "../UI/Buttons/HeaderButton";
import AuthContext from "../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      {authCtx.isLoggedIn ? (
        <div className={classes.btncontainer}>
          <HeaderButton onClick={props.onShowCart} />
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
            userIcon={0}
            requestedLabel="SignUp"
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
