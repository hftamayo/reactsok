import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Card from "../UI/Card/Card";
import ViewCategories from "../Categories/ViewCategories";
import GlobalProvider from "../store/GlobalState";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <div className={classes.home}>
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

      <Routes>
        <Route
          path="/categories"
          element={
            <GlobalProvider>
              <ViewCategories />
            </GlobalProvider>
          }
        />
        <Route path="/newasset" />
        <Route path="/inventory" />
      </Routes>
    </div>
  );
};

export default Dashboard;
