import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";
import SignupForm from "./SignupForm";

const Signup = (props) => {
  const FB_KEY = process.env.SOK_FBASE_API_KEY;
  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB_KEY}`;

  const [newUserData, setNewUserData] = useState("");
  //const cartCtx = useContext(CartContext);

  const SignupFormContent = (
    <React.Fragment>
      <SignupForm setNewUserData={setNewUserDataHandler} />
      {modalButtonActions}
    </React.Fragment>
  );

  const modalButtonActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
  );

  const SignupButtons = (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes.btncontainer}>
          <HeaderButton
            onClick={signupHandler}
            userIcon={1}
            requestedLabel="Save"
          />
          <HeaderButton
            onClick={props.onClose}
            userIcon={0}
            requestedLabel="Close"
          />
        </div>
      </nav>
    </React.Fragment>
  );

  const setNewUserDataHandler = (newUser) => {
    setNewUserData(newUser);
  };

  const signupHandler = async () => {
    setIsSaving(true);
    //showSpinner = true

    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    //showSpinner = false
    if (!response.ok) {
      errorOnSignupHandler(response.data);
    } else {
      setIsSaving(false);
      setIsCanceling(false);
      setDidSave(true);
      //cartCtx.clearCart();
    }
  };

  return (
    <SignupForm />
  );
};

export default Signup;
