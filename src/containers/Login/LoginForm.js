import LoginImage from "../../assets/login.svg";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { loginActions } from "./reducer";
import React from "react";
import { Alert } from "react-bootstrap";
import { CHANGE_PASSWORD_MESSAGE } from "../../constants";

function LoginForm(props) {
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    const changePassMsg = localStorage.getItem(CHANGE_PASSWORD_MESSAGE);
    if (changePassMsg) {
      localStorage.removeItem(CHANGE_PASSWORD_MESSAGE);
      setMessage(changePassMsg);
    }
  }, []);

  const {
    emailInputHandler,
    passwordInputHandler,
    formSubmitHandler,
    error,
    status,
  } = props;

  function submitForm(e) {
    e.preventDefault();
    formSubmitHandler();
  }

  return (
    <>
      {status === loginActions.LOGIN_INIT ? (
        <Spinner />
      ) : (
        <>
          <div className="sign_wrap">
            <div className="row d-flex">
              <div className="col-sm-6 align-self-center">
                <figure>
                  <img src={LoginImage} alt="C-Auth Login" />
                </figure>
              </div>
              <div className="col-sm-6">
                <figure className="sign_logo">
                  <img src={Logo} alt="logo" />
                </figure>
                <h2 className="text-center">Login Account</h2>
                {error ? (
                  <div
                    className="mx-auto alert alert-danger alert text-center"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}
                <input
                  type="email"
                  id="email"
                  className="form-control form_control mb-3"
                  placeholder="Email"
                  onChange={(e) => emailInputHandler(e.target.value)}
                />
                <input
                  type="password"
                  id="password"
                  className="form-control form_control mb-2"
                  placeholder="Password"
                  onChange={(e) => passwordInputHandler(e.target.value)}
                />
                <div className="cf"></div>
                <input
                  type="button"
                  value="Login"
                  className="btn btn_theme"
                  onClick={(e) => submitForm(e)}
                />
                {message ? (
                  <Alert variant="success" className="chg_pass_msg">
                    {message}
                  </Alert>
                ) : null}
                <hr />
                <p className="text-right mb-0">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="fixed-bottom copy">
            <p className="text-center">© 2022 C-AUTH. All Rights Reserved.</p>
          </div>
        </>
      )}
    </>
  );
}

export default LoginForm;
