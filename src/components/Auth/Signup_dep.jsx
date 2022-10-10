import React, { useState, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";
import Input from "../UI/Input/Input";

const FB_KEY = process.env.SOK_FBASE_API_KEY;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB_KEY}`;

const isEmpty = (value) => value.trim() === "";
const isNotSevenChars = (value) => value.trim().length !== 7;
const notEqualPasswords = (value1, value2) => value1.trim() === value2.trim();

const Signup = (props) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [didSave, setDidSave] = useState(false);
  const [isErrorOnSave, setIsErrorOnSave] = useState(false);
  const [errorOnSaveMessage, setErrorOnSaveMessage] = useState("");

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password1: true,
    password2: true,
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailClientRef = useRef();
  const password1ClientRef = useRef();
  const password2ClientRef = useRef();

  const [newUserData, setNewUserData] = useState("");
  //const cartCtx = useContext(CartContext);

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

  const errorOnSignupHandler = (errorDescription) => {
    setErrorOnSaveMessage(errorDescription);
    setIsErrorOnSave(true);
  };

  const validateNewUserDataHandler = () => {
    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmail = emailClientRef.current.value;
    const enteredPassword1 = password1ClientRef.current.value;
    const enteredPassword2 = password2ClientRef.current.value;

    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enteredLastNameIsValid = !isEmpty(enteredLastName);
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordLength = !isNotSevenChars(enteredPassword1);
    const enteredConfirmPassword = !notEqualPasswords(
      enteredPassword1,
      enteredPassword2
    );

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
      password1: enteredPasswordLength,
      password2: enteredConfirmPassword,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredEmailIsValid &&
      enteredPasswordLength &&
      enteredConfirmPassword;

    if (!formIsValid) {
      return;
    }

    const newUser = [
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      enteredPassword1,
    ];
    console.log("Data desde SignupForm" + newUser);

    setNewUserData(newUser);
    setIsSaving(true);
  };

  const firstNameControlClasses = `${classes.control} ${
    formInputsValidity.firstName ? "" : classes.invalid
  }`;
  const lastNameControlClasses = `${classes.control} ${
    formInputsValidity.lastName ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;
  const password1ControlClasses = `${classes.control} ${
    formInputsValidity.password1 ? "" : classes.invalid
  }`;
  const password2ControlClasses = `${classes.control} ${
    formInputsValidity.password2 ? "" : classes.invalid
  }`;

  const saveUserDataHandler = async () => {
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

  const signupHandler = () => {
    validateNewUserDataHandler();
    isSaving && saveUserDataHandler();
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

const SignupButtons = (
  <React.Fragment>
    <nav className={classes.nav}>
      <div className={classes.btncontainer}>
        <HeaderButton
          onClick={signupHandler()}
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
  <form className={classes.form}>
    <h3>Create New Account</h3>
    <div className={firstNameControlClasses}>
      <Input
        id="firstname"
        required
        label="First Name"
        type="text"
        ref={firstNameRef}
        autoComplete="off"
        setAutoFocus="true"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      {!formInputsValidity.firstName && <p>Please enter a valid first name</p>}
    </div>

    <div className={lastNameControlClasses}>
      <Input
        id="lastname"
        required
        label="Last Name"
        type="text"
        autoComplete="off"
        ref={lastNameRef}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      {!formInputsValidity.lastName && <p>Please enter a valid last name</p>}
    </div>

    <div className={emailControlClasses}>
      <Input
        id="email"
        required
        label="E-Mail"
        type="email"
        autoComplete="off"
        ref={emailClientRef}
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      {!formInputsValidity.email && <p>Please enter a valid Email</p>}
    </div>

    <div className={password1ControlClasses}>
      <Input
        id="paswword1"
        required
        label="Password"
        type="password"
        autoComplete="new-password"
        ref={password1ClientRef}
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      {!formInputsValidity.password1 && <p>Please enter a valid Password</p>}
    </div>

    <div className={password2ControlClasses}>
      <Input
        id="paswword2"
        required
        label="Re-Type password"
        type="password"
        autoComplete="new-password"
        ref={password2ClientRef}
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      {!formInputsValidity.password2 && <p>Please enter a valid Password</p>}
    </div>
    {modalButtonActions}
  </form>
);

export default Signup;
