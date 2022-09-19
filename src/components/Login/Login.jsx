import React, { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import HeaderButton from "../UI/Buttons/HeaderButton";
import AuthContext from "../store/auth-context";

const Login = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isCanceling, setIsCanceling] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [didValidate, setDidValidate] = useState(false);
  const [isErrorOnValidate, setIsErrorOnValidate] = useState(false);
  const authCtx = useContext(AuthContext);

  const emailValueHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordValueHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const errorOnValidateHandler = () => {
    setIsErrorOnValidate(true);
  };

  const validateCredentialsHandler = async () => {
    setIsValidating(true);
    const enteredEmail = emailValue;
    const enteredPassword = passwordValue;

    const userCredentialsEntered = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentialsEntered),
    });
    if (!response.ok) {
      errorOnValidateHandler();
    } else {
      setIsValidating(false);
      setIsCanceling(false);
      setDidValidate(true);
      authCtx.onValidSession();
      //cartCtx.clearCart();
    }
  };

  const isValidatingModalContent = <p>Validating Credentials...</p>;
  /* incluir transaccion para verificar si es exitoso o hubo algun error */

  const errorOnValidateModalContent = (
    <Fragment>
      <p>User or Password incorrect, please verify</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const didValidateModalContent = (
    <Fragment>
      <p>Creditials verified, welcome!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const loginButtons = (
    <Fragment>
      <div className={classes.btncontainer}>
        <HeaderButton
          onClick={validateCredentialsHandler}
          userIcon={1}
          requestedLabel="Login"
        />
        <HeaderButton
          onClick={props.onClose}
          userIcon={0}
          requestedLabel="Close"
        />
      </div>
    </Fragment>
  );

  const modalActions = (
    <div className={classes.actions}>{!isCanceling ? loginButtons : ""}</div>
  );

  const LoginModalContent = (
    <Fragment>
      <Input
        onChange={emailValueHandler}
        id="email"
        label="E-Mail"
        type="email"
        autodata="off"
        //isValid={emailIsValid}
        //value={emailState.value}
        //onChange={emailChangeHandler}
        //onBlur={validateEmailHandler}
      />
      <Input
        onChange={passwordValueHandler}
        id="paswword"
        label="Password"
        type="password"
        autodata="new-password"
        //isValid={passwordIsValid}
        //value={passwordState.value}
        //onChange={passwordChangeHandler}
        //onBlur={validatePasswordHandler}
      />
      {modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCanceling &&
        !isValidating &&
        !isErrorOnValidate &&
        !didValidate &&
        LoginModalContent}
      {isValidating && isValidatingModalContent}
      {isErrorOnValidate && errorOnValidateModalContent}
      {!isValidating && didValidate && didValidateModalContent}
    </Modal>
  );
};

export default Login;
