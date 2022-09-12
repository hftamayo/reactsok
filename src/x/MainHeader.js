import React, { useState, Fragment } from "react";
import Login from "../Login/Login";
import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const [loginIsShown, setLoginIsShown] = useState(false);

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  return (
    <Fragment>
      {loginIsShown && <Login onClose={hideLoginHandler} />}
      <header className={classes["main-header"]}>
        <h1>Sotiria</h1>
        <Navigation onShowLogin={showLoginHandler} />
      </header>
    </Fragment>
  );
};

export default MainHeader;
