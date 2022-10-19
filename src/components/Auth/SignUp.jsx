import React, { useState, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import HeaderButton from "../UI/Buttons/HeaderButton";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const IS_SAVING_USER = "Requesting new user creation, please wait...";
const SAVE_USER_SUCCESS = "The User Account has been Created, please go to the Login option";
const SAVE_USER_ERROR = "An unexpected error has been occured, Please notify to tech support the next error:";

const SIGNUP_URL = "https://movieserp-default-rtdb.firebaseio.com/subscribers.json";

const SignUp = (props) => {
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailClientValue, setEmailClientValue] = useState("");
  const [passwordClientValue, setPasswordClientValue] = useState("");

  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);

  const firstNameValueHandler = (event) => {
    setFirstNameValue(event.target.value);
  };

  const lastNameValueHandler = (event) => {
    setLastNameValue(event.target.value);
  };

  const emailClientValueHandler = (event) => {
    setEmailClientValue(event.target.value);
  };

  const passwordClientValueHandler = (event) => {
    setPasswordClientValue(event.target.value);
  };

  const errorOnSignupHandler = () => {
    setIsErrorOnSave(true);
  };

  const signupHandler = async () => {
    setIsSaving(true);
    const enteredFirstname = firstNameValue;
    const enteredLastname = lastNameValue;
    const enteredEmail = emailClientValue;
    const enteredPassword = passwordClientValue;

    const newClientData = {
      firstname: enteredFirstname,
      lastname: enteredLastname,
      email: enteredEmail,
      password: enteredPassword,
    };

    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClientData),
    });

    if (!response.ok) {
      setIsErrorOnSave(true);
      setIsSaving(false);
      errorOnSignupHandler();
    } else {
      setIsSaving(false);
      setIsCanceling(false);
      setDidSave(true);
    }
  };

  const isSavingModalContent = <p className={classes.usrmessage}>{IS_SAVING_USER}</p>;

  const errorOnSavingModalContent = (
    <React.Fragment>
      <p className={classes.usrmessage}>{SAVE_USER_ERROR}</p>
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
      <p className={classes.usrmessage}>{SAVE_USER_SUCCESS}</p>
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

  const modalActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
  );

  const SignupModalContent = (
    <React.Fragment>
      <Input
        onChange={firstNameValueHandler}
        id="firstname"
        label="First Name"
        type="text"
        value={firstNameValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        onChange={lastNameValueHandler}
        id="lastname"
        label="Last Name"
        type="text"
        value={lastNameValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        onChange={emailClientValueHandler}
        id="email"
        label="E-Mail"
        type="email"
        autodata="off"
        value={emailClientValue}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        onChange={passwordClientValueHandler}
        id="paswword"
        label="Password"
        type="password"
        autodata="new-password"
        value={passwordClientValue}
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      <Input
        //ref={passwordInputRef}
        id="paswword2"
        label="Confirm-Password"
        type="password"
        autodata="new-password"
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
      {!isSaving && isErrorOnSave && errorOnSavingModalContent}
      {!isSaving && didSave && didSaveModalContent}
    </Modal>
  );
};

export default SignUp;
