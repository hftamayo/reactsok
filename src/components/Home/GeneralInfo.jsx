import React, { Fragment } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const GeneralInfo = () => {
  return (
    <div className={classes.home}>
      <Card>
        <h1>What is Sot1r1a?</h1>
      </Card>
      <Card>
        <h1>Why Sot1r1a?</h1>
      </Card>
      <Card>
        <h1>Sot1r1a's feature</h1>
      </Card>
    </div>
  );
};

export default GeneralInfo;
