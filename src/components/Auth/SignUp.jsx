import React, { useState, Fragment } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import HeaderButton from "../UI/Buttons/HeaderButton";
import fireDb from "../../store/firebase";

const IS_SAVING_USER = "Requesting new user creation, please wait...";
const SAVE_USER_SUCCESS =
  "The User Account has been Created, please go to the Login option";
const SAVE_USER_ERROR = "An unexpected error has been occured, Please verify";

const SignUp = (props) => {
  const SIGNUP_URL =
    "https://sotiria-f6005-default-rtdb.firebaseio.com/subscribers.json";
    

  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailClientValue, setEmailClientValue] = useState("");
  const [passwordClientValue, setPasswordClientValue] = useState("");

  const [isValidating, setIsValidating] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  const [incidentMessage, setIncidentMessage] = useState("");  

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

  const updateActionHandler = (newAction) => {
    if (newAction === "validating") {
      setIsValidating(true);
    } else if (newAction === "notValidating") {
      setIsValidating(false);
    } else if (newAction === "errorOnSave") {
      setIsErrorOnSave(true);
      setIncidentMessage("Unexpected error on saving");
    } else if (newAction === "okOnSave") {
      setDidSave(true);
      setIncidentMessage("New user data saved");
    }
    //update global logfile: mySuperLogComponent(incidentMessage);
  };

  const signupHandler = async () => {
    updateActionHandler("validating");

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

    updateActionHandler("notValidating");

    if (!response.ok) {
      updateActionHandler("errorOnSave");
    } else {
      updateActionHandler("okOnSave");
    }
  };

  const userMessagesModalContent = (messageType) => {
    let showMessage = "";
    if (messageType === 1) {
      showMessage = IS_SAVING_USER;
    } else if (messageType === 2) {
      showMessage = SAVE_USER_ERROR;
    } else if (messageType === 3) {
      showMessage = SAVE_USER_SUCCESS;
    }
    return (
      <Fragment>
        <p className={classes.usrmessage}>{showMessage}</p>
        {messageType !== 1 && (
          <nav className={classes.nav}>
            <div className={classes.btncontainer}>
              <button className={classes.button} onClick={props.onClose}>
                Close
              </button>
            </div>
          </nav>
        )}
      </Fragment>
    );
  };

  const signUpButtons = (
    <Fragment>
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
    </Fragment>
  );

  const SignupModalContent = (
    <Fragment>
      <Input
        onChange={firstNameValueHandler}
        id="firstname"
        label="First Name"
        type="text"
        value={firstNameValue}
        focus={true}
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
        complete="off"
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
        complete="new-password"
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
        complete="new-password"
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      <div className={classes.actions}>{signUpButtons}</div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isValidating &&
        !isErrorOnSave &&
        !didSave &&
        SignupModalContent}
      {isValidating && userMessagesModalContent(1)}
      {isErrorOnSave && userMessagesModalContent(2)}
      {didSave && userMessagesModalContent(3)}
    </Modal>
  );
};

export default SignUp;
