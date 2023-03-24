import React, { useContext, Fragment } from "react";
import GeneralInfo from "./GeneralInfo";
import DashBoard from "./DashBoard";
import DashboardLayout from "../UI/Layouts/DashboardLayout";
import AuthContext from "../store/auth-context";

const Home = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      {authCtx.isLoggedIn ? (
        <DashboardLayout>
          <DashBoard />
        </DashboardLayout>
      ) : (
        <DashboardLayout>
          <GeneralInfo />
        </DashboardLayout>
      )}
    </Fragment>
  );
};

export default Home;
