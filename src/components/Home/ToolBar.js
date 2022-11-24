import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewCategories from "../Categories/ViewCategories";
import GlobalProvider from "../store/GlobalState";
import classes from "./DashBoard.module.css";

const Dashboard = () => {
  return (
    <BrowserRouter>
      <header className={classes.toolbar}>
        <div>
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/newasset">Assets</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
          </ul>
        </div>
      </header>
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
    </BrowserRouter>
  );
};

export default Dashboard;
