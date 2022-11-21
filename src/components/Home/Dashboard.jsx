import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Card from "../UI/Card/Card";
import ViewCategories from "../Categories/ViewCategories";
import GlobalProvider from "../store/AuthProvider";
import classes from "./Home.module.css";

const Dashboard = () => {
  return (
    <div className={classes.home}>
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
