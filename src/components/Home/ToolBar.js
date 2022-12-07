import React from "react";
import { Link } from "react-router-dom";
import classes from "./DashBoard.module.css";

const ToolBar = () => {
  return (
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
  );
};

export default ToolBar;
