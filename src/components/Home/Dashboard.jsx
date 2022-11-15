import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <div className={classes.home}>
      <BrowserRouter>
        <Card>
          <h1>
            <Link to="/categories">Categories</Link>
          </h1>
        </Card>
        <Card>
          <h1>
            <Link to="/newasset">New Asset</Link>
          </h1>
        </Card>
        <Card>
          <h1>
            <Link to="/inventory">Inventory</Link>
          </h1>
        </Card>

        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/newasset">
            {/* <AssetForm /> */}
          </Route>
          <Route path="/inventory">
            {/* <Inventory /> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Dashboard;
