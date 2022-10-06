import React, { useState } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import Signup from "./Signup";

const SignupContainer = (props) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  const [errorOnSaveMessage, setErrorOnSaveMessage] = useState("");

  const isSavingModalContent = <p>Saving new user...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnSavingModalContent = (
    <React.Fragment>
      <p>
        The user account could not be created. Please report the next error:
      </p>
      <p>{errorOnSaveMessage}</p>
      <nav className={classes.nav}>
        <div className={classes.btncontainer}>
          <HeaderButton
            onClick={props.onClose}
            userIcon={0}
            requestedLabel="Close"
          />
        </div>
      </nav>
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

  const SignupModalContent = (
    <React.Fragment>
      <Signup onError={errorOnSignupHandler} onSuccess={didSaveModalContent} />
    </React.Fragment>
  );

  const errorOnSignupHandler = (errorDescription) => {
    setErrorOnSaveMessage(errorDescription);
    setIsErrorOnSave(true);
  };

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

export default SignupContainer;
