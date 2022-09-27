import React, { useState, useRef } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";

const isEmpty = (value) => value.trim() === "";
const isNotSevenChars = (value) => value.trim().length !== 7;
const notEqualPasswords = (value1, value2) => value1.trim() === value2.trim();

const SignupForm = (props) => {
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

  const submitHandler = (event) => {
    event.prevent.Default();

    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmail = emailClientRef.current.value;
    const enteredPassword1 = password1ClientRef.current.value;
    const enteredPassword2 = password2ClientRef.current.value;

    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enteredLastNameIsValid = !isEmpty(enteredLastName);
    const enteredEmailIsValid = !isEmpty(enteredEmail);
    const enteredPasswordLength = !isNotSevenChars(enteredPassword1);
    const enteredConfirmPassword =
      enteredPasswordLength &&
      !notEqualPasswords(enteredPassword1, enteredPassword2);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
      password: enteredConfirmPassword,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValud &&
      enteredEmailIsValid &&
      enteredConfirmPassword;

      if(!formIsValid){
        return;
      }

      props.onConfirm({
        firstName: enteredFirstName,
        lastName: enteredLastName,
        email: enteredEmail,
        password: enteredPassword1,
      });
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
    formInputsValidity.password ? "" : classes.invalid
  }`;
  const password2ControlClasses = `${classes.control} ${
    formInputsValidity.password ? "" : classes.invalid
  }`;

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
