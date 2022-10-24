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

  const [isValidating, setIsValidating] = useState(false);
  const [didValidate, setDidValidate] = useState(false);
  const [errorOnInputCredentials, setErrorOnInputCredentials] = useState(false);
  const [incidentMessage, setIncidentMessage] = useState("");

  const authCtx = useContext(AuthContext);

  const emailValueHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const passwordValueHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const updateActionHandler = (newAction) => {
    if (newAction === "validating") {
      setIsValidating(true);
    } else if (newAction === "notValidating") {
      setIsValidating(false);
    } else if (newAction === "errorOnValidation") {
      setErrorOnInputCredentials(true);
      setIncidentMessage("User or password invalids");
    } else if (newAction === "validCreds") {
      setDidValidate(true);
      setIncidentMessage("Login successful")      
      authCtx.onValidSession();
    }
    //update global logfile: mySuperLogComponent(incidentMessage);
  };

  const validateCredentialsHandler = async () => {
    updateActionHandler("validating");
    //showSpinner = true

    const response = await fetch(LOGIN_URL, {
      method: "GET",
    });
    if (!response.ok) {
      setIncidentMessage("Communication error with the data repository") &&
        updateActionHandler("errorOnValidation");
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

    updateActionHandler("notValidating");

    !validCredentials
      ? updateActionHandler("errorOnValidation")
      : updateActionHandler("validCreds");
  };

  const userMessagesModalContent = (messageType) => {
    let showMessage = "";
    if (messageType === 1) {
      showMessage = IS_VALIDATING;
    } else if (messageType === 2) {
      showMessage = INVALID_CREDS;
    } else if (messageType === 3) {
      showMessage = VALID_CREDS;
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
      <div className={classes.actions}>{loginButtons}</div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isValidating &&
        !errorOnInputCredentials &&
        !didValidate &&
        LoginModalContent}
      {isValidating && userMessagesModalContent(1)}
      {errorOnInputCredentials && userMessagesModalContent(2)}
      {didValidate && userMessagesModalContent(3)}
    </Modal>
  );
};

export default Login;
