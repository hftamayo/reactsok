import React, { useState, useRef } from "react";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const SignupForm = (props) => {

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
          autoComplete="off"
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
    </form>
  );
};

export default SignupForm;
