import React, { useContext, Fragment } from "react";
import GeneralInfo from "./GeneralInfo";
import DashBoard from "./DashBoard";
import AuthContext from "../store/auth-context";

const Home = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>{authCtx.isLoggedIn ? <DashBoard /> : <GeneralInfo />}</Fragment>
  );
};

export default Home;