import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginForm.css";
import LoginImage from "./assets/login.svg";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { loginActions } from "./reducer";

function LoginForm(props) {
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
        <div className="login_sign_wrap">
          <div className="row d-flex">
            <div className="col-sm-6 align-self-center">
              <figure>
                <img src={LoginImage} alt="C-Auth Login" />
              </figure>
            </div>
            <div className="col-sm-6">
              <figure className="login_sign_logo">
                <img src={Logo} alt="logo" />
              </figure>
              <h2 className="text-center">Login Account</h2>
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
              <div className="login_cf"></div>
              {error !== "" ? (
                <div
                  className="mx-auto alert alert-danger login_alert"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}
              <input
                type="button"
                value="Login"
                className="btn login_btn_theme"
                onClick={(e) => submitForm(e)}
              />
              <hr />
              <p className="text-right mb-0">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed-bottom copy">
        <p className="text-center">© 2022 C-AUTH. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default LoginForm;
