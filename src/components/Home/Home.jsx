import React, { useContext, Fragment } from "react";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import GeneralInfo from "./GeneralInfo";
import Dashboard from "./Dashboard";
import AuthContext from "../store/auth-context";

const Home = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>{authCtx.isLoggedIn ? <Dashboard /> : <GeneralInfo />}</Fragment>
  );
};

export default Home;