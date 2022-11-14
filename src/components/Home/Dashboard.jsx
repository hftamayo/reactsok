import React from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
      <div className={classes.home}>
        <Card>
          <h1>Categories</h1>
        </Card>
        <Card>
          <h1>New Asset</h1>
        </Card>
        <Card>
          <h1>Inventory</h1>
        </Card>
      </div>
  );
};

export default Dashboard;
