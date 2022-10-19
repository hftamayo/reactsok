import { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import HeaderButton from "../UI/Buttons/HeaderButton";
import AuthContext from "../store/auth-context";

const IS_VALIDATING = "Validating Credentials...";
const INVALID_CREDS = "User or Password incorrect, please verify";
const VALID_CREDS = "Credentials verified, welcome!";

const Login = (props) => {
  const LOGIN_URL =
    "https://movieserp-default-rtdb.firebaseio.com/subscribers.json";

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [isCanceling, setIsCanceling] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [didValidate, setDidValidate] = useState(false);
  const [errorOnInputCredentials, setErrorOnInputCredentials] = useState(false);
  const [isErrorOnValidate, setIsErrorOnValidate] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailValueHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordValueHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const errorOnValidateHandler = (errorDescription) => {
    setErrorOnInputCredentials(errorDescription);
    setIsErrorOnValidate(true);
  };

  const successValidateHandler = () => {
    authCtx.onValidSession();
    setIsCanceling(false);
    setDidValidate(true);
  };

  const validateCredentialsHandler = async () => {
    setIsValidating(true);
    //showSpinner = true
    const inputCredentials = {
      enteredEmail: emailValue,
      enteredPassword: passwordValue,
      returnSecureToken: true,
    };

    const response = await fetch(LOGIN_URL, {
      method: "GET",
    });
    if (!response.ok) {
      errorOnValidateHandler(response.data);
    }
    const subscribersRawData = await response.json();

    const subscribersData = [];

    for (const key in subscribersRawData) {
      subscribersData.push({
        id: key,
        email: subscribersRawData[key].email,
        password: subscribersRawData[key].password,
      });
    }

    let validCredentials = subscribersData.find(
      (subscriber) =>
        subscriber.email === emailValue && subscriber.password === passwordValue
    );

    setIsValidating(false);

    !validCredentials ? errorOnValidateHandler() : successValidateHandler();
  };

  const isValidatingModalContent = (
    <p className={classes.usrmessage}>{IS_VALIDATING}</p>
  );

  const errorOnValidateModalContent = (
    <Fragment>
      <p className={classes.usrmessage}>{INVALID_CREDS}</p>
      <p>{errorOnInputCredentials}</p>
      <nav className={classes.nav}>
        <div className={classes.btncontainer}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </nav>
    </Fragment>
  );

  const didValidateModalContent = (
    <Fragment>
      <p className={classes.usrmessage}>{VALID_CREDS}</p>
      <nav className={classes.nav}>
        <div className={classes.btncontainer}>
          <button className={classes.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </nav>
    </Fragment>
  );

  const loginButtons = (
    <Fragment>
      <nav className={classes.nav}>
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
      </nav>
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
        focus={true}        
      />
      <Input
        onChange={passwordValueHandler}
        id="paswword"
        label="Password"
        type="password"
        autodata="new-password"
      />
      {modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isCanceling && !isValidating && !isErrorOnValidate && !didValidate && LoginModalContent}
      {isValidating && isValidatingModalContent}
      {isErrorOnValidate && errorOnValidateModalContent}
      {didValidate && didValidateModalContent}
    </Modal>
  );
};

export default Login;
