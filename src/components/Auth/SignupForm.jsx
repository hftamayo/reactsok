import React, { useState, useRef } from "react";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotSevenChars = (value) => value.trim().length !== 7;
const notEqualPasswords = (value1, value2) => value1.trim() === value2.trim();

const SignupForm = (props) => {
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

  const submitNewUserHandler = (event) => {
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
    const enteredConfirmPassword = !notEqualPasswords(
      enteredPassword1,
      enteredPassword2
    );

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
      password1: enteredConfirmPassword,
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

    const newUser = [enteredFirstName, enteredLastName, enteredEmail, enteredPassword1];
    console.log("Data desde SignupForm" + newUser);

    props.setNewUserData(newUser);
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

  return (
    <form className={classes.form} onSubmit={submitNewUserHandler}>
      <h3>Create New Account</h3>
      <div className={firstNameControlClasses}>
        <Input
          id="firstname"
          required
          label="First Name"
          type="text"
          ref={firstNameRef}
          setAutoFocus="true"
          //isValid={emailIsValid}
          //value={emailState.value}
          //onChange={emailChangeHandler}
          //onBlur={validateEmailHandler}
        />
        {!formInputsValidity.firstName && (
          <p>Please enter a valid first name</p>
        )}
      </div>

      <div className={lastNameControlClasses}>
        <Input
          id="lastname"
          required
          label="Last Name"
          type="text"
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
          autodata="off"
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
          autodata="new-password"
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
          autodata="new-password"
          ref={password2ClientRef}
          //isValid={passwordIsValid}
          //value={passwordState.value}
          //onChange={passwordChangeHandler}
          //onBlur={validatePasswordHandler}
        />
        {!formInputsValidity.password2 && <p>Please enter a valid Password</p>}
      </div>
    </form>
  );
};

export default SignupForm;
