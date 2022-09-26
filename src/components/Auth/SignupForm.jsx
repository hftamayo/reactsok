import React, { useState, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";

const isEmpty = (value) => value.trim() === "";
const isNotSevenChars = (value) => value.trim().length !== 7;
const notEqualPasswords = (value1, value2) => value1.trim() === value2.trim();

const Signup = (props) => {
  const FB_KEY = process.env.SOK_FBASE_API_KEY;
  const SIGNUP_URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={FB_KEY}";

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailClientRef = useRef();
  const password1ClientRef = useRef();
  const password2ClientRef = useRef();

  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  const [errorOnSaveMessage, setErrorOnSaveMessage] = useState("");
  //const cartCtx = useContext(CartContext);


  const errorOnSignupHandler = (errorDescription) => {
    setErrorOnSaveMessage(errorDescription);
    setIsErrorOnSave(true);
  };

  const signupHandler = async () => {
    setIsSaving(true);
    //showSpinner = true
    const enteredFirstname = firstNameValue;
    const enteredLastname = lastNameValue;
    const enteredEmail = emailClientValue;
    const enteredPassword = passwordClientValue;

    const newClientData = {
      //firstname: enteredFirstname,
      //lastname: enteredLastname,
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientData),
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
      <p>User account created, welcome!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const SignupButtons = (
    <React.Fragment>
      <div className={classes.btncontainer}>
        <HeaderButton
          onClick={signupHandler}
          userIcon={1}
          requestedLabel="Login"
        />
        <HeaderButton
          onClick={props.onClose}
          userIcon={0}
          requestedLabel="Close"
        />
      </div>
    </React.Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
  );

  const SignupModalContent = (
    <React.Fragment>
      <input
        onChange={firstNameValueHandler}
        id="firstname"
        required
        label="First Name"
        type="text"
        value={firstNameValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <input
        onChange={lastNameValueHandler}
        id="lastname"
        required
        label="Last Name"
        type="text"
        value={lastNameValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <input
        onChange={emailClientValueHandler}
        id="email"
        required
        label="E-Mail"
        type="email"
        autodata="off"
        value={emailClientValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <input
        onChange={passwordClientValueHandler}
        id="paswword"
        required
        label="Password"
        type="password"
        autodata="new-password"
        minlength="7"
        value={passwordClientValue}
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      <input
        //ref={passwordInputRef}
        id="paswword2"
        required
        label="Confirm-Password"
        type="password"
        autodata="new-password"
        minlength="7"
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      {modalActions}
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
