import React from "react";
import { Link } from "react-router-dom";
import classes from "./DashBoard.module.css";

const ToolBar = () => {
  return (
    <header className={classes.toolbar}>
      <div>
        <ul>
          <li>
            <Link to="/twcats">TWCats</Link>
          </li>
          <li>
            <Link to="/equipments">Equipments</Link>
          </li>
          <li>
            <Link to="/oses">OpSys</Link>
          </li>
          <li>
            <Link to="/categories">Cats</Link>
          </li>
          <li>
            <Link to="/subcategories">SubCat</Link>
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
