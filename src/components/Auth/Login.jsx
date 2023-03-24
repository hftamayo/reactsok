import { useContext, useState, Fragment } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Login.module.css";
import Input from "../UI/Input/Input";
import HeaderButton from "../UI/Buttons/HeaderButton";
import AuthContext from "../store/auth-context";
import { useTranslation } from "react-i18next";
import fireDb from "../store/firebase";

// const EMAIL_PATTERN =
//   /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@](?!yahoo.com)(?!outlook.com)[a-z]{3,9}[\.][a-z]{2,5}/g;

  const EMAIL_PATTERN =
  /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@](?!yahoo.com)(?!outlook.com)[a-z]{3,9}[.][a-z]{2,5}/g;

const Login = (props) => {
  const { t } = useTranslation();
  const LOGIN_URL =
    "https://sotiria-f6005-default-rtdb.firebaseio.com/subscribers.json";

  const IS_VALIDATING = t('loginFormErrors.is_validating');
  const INVALID_CREDS = t('loginFormErrors.invalid_creds');
  const VALID_CREDS = t('loginFormErrors.valid_creds');
  const EMPTY_FIELD = t('loginFormErrors.empty_field');
  const INVALID_EMAIL = t('loginFormErrors.invalid_email');

  const [displayEmailErrorMessage, setDisplayEmailErrorMessage] = useState("");
  const [displayPasswordErrorMessage, setDisplayPasswordErrorMessage] =
    useState("");
  const [formIsValid, setFormIsValid] = useState(1);

  const [emailValue, setEmailValue] = useState("");
  const [emailValueTouched, setEmailValueTouched] = useState(false);
  const [enteredEmailValidation, setEnteredEmailValidation] = useState(false);
  const emailIsInvalid = !enteredEmailValidation && emailValueTouched;

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordValueTouched, setPasswordValueTouched] = useState(false);
  const [enteredPasswordValidation, setEnteredPasswordValidation] =
    useState(false);
  const passwordIsInvalid = !enteredPasswordValidation && passwordValueTouched;

  const [isValidating, setIsValidating] = useState(false);
  const [didValidate, setDidValidate] = useState(false);
  const [errorOnInputCredentials, setErrorOnInputCredentials] = useState(false);
  const [incidentMessage, setIncidentMessage] = useState("");

  const authCtx = useContext(AuthContext);

  const validateFields = (fieldName) => {
    if (fieldName === "email") {
      console.log("validating email");
      if (emailValue.trim() !== "") {
        let pattern = EMAIL_PATTERN.test(emailValue);
        if (pattern) {
          console.log("input email has succedded the 2 levels of validation");
          setEnteredEmailValidation(true);
          return 1;
        } else {
          console.log("invalid email pattern");
          setEnteredEmailValidation(false);
          setDisplayEmailErrorMessage(INVALID_EMAIL);
          return 0;
        }
      } else {
        console.log("blank email");
        setEnteredEmailValidation(false);
        setDisplayEmailErrorMessage(EMPTY_FIELD);
        return 0;
      }
    }
    if (fieldName === "password") {
      console.log("validating password");
      if (passwordValue.trim() !== "") {
        console.log("input passwod is valid");
        setEnteredPasswordValidation(true);
        return 1;
      } else {
        console.log("invalid password");
        setEnteredPasswordValidation(false);
        setDisplayPasswordErrorMessage(EMPTY_FIELD);
        return 0;
      }
    }
  };

  const emailValueHandler = (event) => {
    setEmailValue(event.target.value);
  };

  const emailValueBlurHandler = (event) => {
    setEmailValueTouched(true);
    let emailResult = validateFields("email");
    setFormIsValid(formIsValid + emailResult);
  };

  const passwordValueHandler = (event) => {
    setPasswordValue(event.target.value);
  };

  const passwordValueBlurHandler = (event) => {
    setPasswordValueTouched(true);
    let passwordResult = validateFields("password");
    setFormIsValid(formIsValid + passwordResult);
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
      setIncidentMessage("Login successful");
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
    setEmailValue("");
    setEmailValueTouched(false);
    setPasswordValue("");
    setPasswordValueTouched(false);

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
                {t("closeButton.text")}
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
            onClick={formIsValid === 3 ? validateCredentialsHandler : undefined}
            userIcon={1}
            requestedLabel={t("loginButton.text")}
          />
          <HeaderButton
            onClick={props.onClose}
            userIcon={0}
            requestedLabel={t("closeButton.text")}
          />
        </div>
      </nav>
    </Fragment>
  );

  const LoginModalContent = (
    <Fragment>
      <Input
        onChange={emailValueHandler}
        onBlur={emailValueBlurHandler}
        id="email"
        label={t("lblEmail.text")}
        type="email"
        complete="off"
        info={t("lblEmail.info")}
        //focus={true}
      />
      {emailIsInvalid && (
        <p className={classes.errorText}>{displayEmailErrorMessage}</p>
      )}

      <Input
        onChange={passwordValueHandler}
        onBlur={passwordValueBlurHandler}
        id="paswword"
        label={t("lblPassword.text")}
        type="password"
        complete="new-password"
        info={t("lblPassword.info")}
      />
      {passwordIsInvalid && (
        <p className={classes.errorText}>{displayPasswordErrorMessage}</p>
      )}
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
