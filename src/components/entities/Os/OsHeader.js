import React from "react";
import { Link } from "react-router-dom";
import classes from "../Cruds.module.css";

export const OsHeader = () => {
  return (
    <div className={classes.flexbox_main_container}>
      <div className={classes.flexbox_crud_controls}>
          <span className={classes.crud_title}>Operating System Listing</span>
        <br />
          <Link to="/add-os">
            <button className={classes.btn + " " + classes.btn_new}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span className="pl-2">Add Operating System</span>
            </button>
          </Link>
        </div>
      </div>
  );
};

export default OsHeader;
