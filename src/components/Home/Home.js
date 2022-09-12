import React, { Fragment } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Fragment>
      <Card className={classes.home}>
        <h1>Recent Activity:</h1>
      </Card>
    </Fragment>
  );
};

export default Home;
