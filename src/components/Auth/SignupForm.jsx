import React, { useState, useRef } from "react";
import classes from "./Login.module.css";

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

    if (!formIsValid) {
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

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={firstNameControlClasses}>
        <label htmlFor="firstName">First Name</label>
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
        {!formInputsValidity.firstName && (
          <p>Please enter a valid first name</p>
        )}
      </div>

      <div className={lastNameControlClasses}>
        <label htmlFor="lastName">Last Name</label>
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
        {!formInputsValidity.lastName && <p>Please enter a valid last name</p>}
      </div>

      <div className={emailControlClasses}>
        <label htmlFor="email">E-mail</label>
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
        {!formInputsValidity.email && <p>Please enter a valid Email</p>}
      </div>

      <div className={password1ControlClasses}>
        <label htmlFor="password1">Password</label>
        <input
          onChange={password1ClientValueHandler}
          id="paswword1"
          required
          label="Password"
          type="password"
          autodata="new-password"
          minlength="7"
          value={password1ClientValue}
          //isValid={passwordIsValid}
          //value={passwordState.value}
          //onChange={passwordChangeHandler}
          //onBlur={validatePasswordHandler}
        />
        {!formInputsValidity.password && <p>Please enter a valid Password</p>}
      </div>

      <div className={password2ControlClasses}>
        <label htmlFor="password2">Password Confirmation</label>
        <input
          onChange={password2ClientValueHandler}
          id="paswword2"
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
        {!formInputsValidity.password && <p>Please enter a valid Password</p>}
      </div>
    </form>
  );
};

export default SignupForm;
