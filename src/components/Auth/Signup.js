import React, { useState } from "react";
import classes from "./Login.module.css";
import HeaderButton from "../UI/Buttons/HeaderButton";
import SignupForm from "./SignupForm";

const isEmpty = (value) => value.trim() === "";
const isNotSevenChars = (value) => value.trim().length !== 7;
const notEqualPasswords = (value1, value2) => value1.trim() === value2.trim();
const FB_KEY = process.env.SOK_FBASE_API_KEY;
const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FB_KEY}`;

const Signup = (props) => {
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

    //props.setNewUserData(newUser);
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

  const modalButtonActions = (
    <div className={classes.actions}>{!isCanceling ? SignupButtons : ""}</div>
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

  const setNewUserDataHandler = (newUser) => {
    setNewUserData(newUser);
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

  return (
    <React.Fragment>
      <SignupForm onNewUser={setNewUserData} onSubmit={signupHandler} />
      {modalButtonActions}
    </React.Fragment>
  );
};

export default Signup;
