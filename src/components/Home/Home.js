import React, { Fragment } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <div className={classes.home}>
      <Card>
        <h1>What is Sotyria?</h1>
      </Card>
      <Card>
        <h1>Why Sotyria?</h1>
      </Card>
      <Card>
        <h1>Sotyria's feature</h1>
      </Card>
    </div>
  );
};

export default Home;
