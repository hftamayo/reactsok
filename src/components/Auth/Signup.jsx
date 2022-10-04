import React, { useContext, useState, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";
import SignupForm from "./SignupForm";

const Signup = (props) => {
  const FB_KEY = process.env.SOK_FBASE_API_KEY;
  const SIGNUP_URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FB_KEY}";

  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  const [errorOnSaveMessage, setErrorOnSaveMessage] = useState("");
  const [newUserData, setNewUserData] = useState("");
  //const cartCtx = useContext(CartContext);


  const gatherNewUserData = (newUser) => {
    setNewUserData(newUser);
  }

  const errorOnSignupHandler = (errorDescription) => {
    setErrorOnSaveMessage(errorDescription);
    setIsErrorOnSave(true);
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

  const isSavingModalContent = <p>Saving new user...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnSavingModalContent = (
    <React.Fragment>
      <p>
        The user account could not be created. Please report the next error:
      </p>
      <p>{errorOnSaveMessage}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const didSaveModalContent = (
    <React.Fragment>
      <p>User account created, please use the login option</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
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

  const modalButtonActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
  );

  const SignupModalContent = (
    <React.Fragment>
      <SignupForm getNewUserData={getNewUserData}/>
      {modalButtonActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCanceling &&
        !isSaving &&
        !isErrorOnSave &&
        !didSave &&
        SignupModalContent}
      {isSaving && isSavingModalContent}
      {isErrorOnSave && errorOnSavingModalContent}
      {!isSaving && didSave && didSaveModalContent}
    </Modal>
  );
};

export default Signup;
