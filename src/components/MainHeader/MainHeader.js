import React from "react";
import classes from "./Header.module.css";
import ButtonsContainer from "./ButtonsContainer";

const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>Sot1r1a</h1>
      <ButtonsContainer />
    </header>
  );
};

export default MainHeader;
