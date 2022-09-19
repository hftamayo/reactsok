import React, { Fragment } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <div className={classes.home}>
      <Card>
        <h1>Welcome Dear User</h1>
      </Card>
    </div>
  );
};

export default Dashboard;
