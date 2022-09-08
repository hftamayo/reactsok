import React from "react";
import Home from "./Home/Home";
import MainHeader from "./MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function LoginUsers() {
  return (
    <React.Fragment>
      <MainHeader />
      <Home />
    </React.Fragment>
  );
}

export default LoginUsers;
