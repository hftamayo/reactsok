import React from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <div className={classes.home}>
      <h1>Please choose one of the bellow option</h1>
      <Card>
        <h1>Categories</h1>
      </Card>
      <Card>
        <h1>Add New Asset</h1>
      </Card>      
      <Card>
        <h1>Inventory</h1>
      </Card>      
    </div>
  );
};

export default Dashboard;
