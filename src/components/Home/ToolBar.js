import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewCategories from "../Categories/ViewCategories";
import GlobalProvider from "../store/GlobalState";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <BrowserRouter>
      <header className={classes.header}>
        <nav>
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/newasset">New Asset</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
          </ul>
        </nav>
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
