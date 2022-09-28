import React, { useContext, Fragment } from "react";
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