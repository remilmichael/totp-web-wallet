import React from "react";
import RegisterImage from "../../assets/login.svg";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { registerStatus } from "./Register";
import Spinner from '../../components/Spinner';

function RegisterForm(props) {
  // destructure
  const {
    emailInputHandler,
    passwordInputHandler,
    confirmPassHandler,
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
      {status === registerStatus.REGISTER_INIT ? (
        <Spinner />
      ) : (
        <>
          <div className="login_sign_wrap">
            <div className="row d-flex">
              <div className="col-sm-6 align-self-center">
                <figure>
                  <img src={RegisterImage} alt="C-Auth Login" />
                </figure>
              </div>
              <div className="col-sm-6">
                <figure className="login_sign_logo">
                  <img src={Logo} alt="logo" />
                </figure>
                <h2 className="text-center">Register Account</h2>
                {error ? (
                  <div
                    className="mx-auto alert alert-danger login_alert text-center"
                    role="alert"
                  >
                    {error}
                  </div>
                ) : null}
                <input
                  type="email"
                  id="email"
                  className="form-control login_form_control mb-3"
                  placeholder="Email"
                  onChange={(e) => emailInputHandler(e.target.value)}
                />
                <input
                  type="password"
                  id="password"
                  className="form-control login_form_control mb-2"
                  placeholder="Password"
                  onChange={(e) => passwordInputHandler(e.target.value)}
                />
                <input
                  type="password"
                  id="confirm_password"
                  className="form-control login_form_control mb-2"
                  placeholder="Confirm Password"
                  onChange={(e) => confirmPassHandler(e.target.value)}
                />
                <div className="login_cf"></div>
                {status === registerStatus.REGISTER_SUCCESS ? (
                  <div
                    className="mx-auto alert alert-success login_alert"
                    role="alert"
                  >
                    Registration Successful. Please{" "}
                    <Link to="/login">login</Link> now.
                  </div>
                ) : null}
                <input
                  type="button"
                  value="Register"
                  className="btn login_btn_theme"
                  onClick={(e) => submitForm(e)}
                />
                <hr />
                <p className="text-right mb-0">
                  Already have an account? <Link to="/login">Login</Link>
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

export default RegisterForm;
