import { instance, rfc5054 } from "../../constants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { initialState, loginActions, reducer } from "./reducer";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { saveCredential } from "../../reducers/credential";

const SRP6JavascriptClientSession = require("thinbus-srp/browser")(
  rfc5054.N_base10,
  rfc5054.g_base10,
  rfc5054.k_base16
);

function Login() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = () => {
    if (!state.email) {
      dispatch({ type: "error", payload: "Email appears to be invalid!" });
    } else if (!state.password) {
      dispatch({ type: "error", payload: "Password appears to be empty!" });
    } else {
      dispatch({ type: loginActions.LOGIN_INIT });
      performLogin();
    }
  };

  const fetchAuthCredentials = async (A, M1) => {
    return instance
      .post(
        "/login",
        {
          email: state.email,
          a: A,
          m1: M1,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        dispatch({
          type: loginActions.LOGIN_FAILED,
          payload: err.response.data.message,
        });
      });
  };

  const performLogin = async () => {
    const serverChallenge = await fetchUserSalt();
    if (serverChallenge) {
      const { salt, b } = serverChallenge;
      const client = new SRP6JavascriptClientSession();
      client.step1(state.email, state.password);
      const { A, M1 } = client.step2(salt, b);
      const credential = await fetchAuthCredentials(A, M1);
      if (credential.access_token) {
        const data = await fetchEncryptionKey();
        if (data.encKey) {
          // LOGIN_SUCCESSFUL
          dispatch({ type: loginActions.LOGIN_SUCCESS });
          reduxDispatch(
            saveCredential({
              email: state.email,
              encKey: data.encKey,
              expiry: credential.token_expiry,
            })
          );
          navigate("/dashboard");
        }
      }
    }
  };

  const fetchEncryptionKey = async () => {
    return instance
      .get(`/enckey?email=${state.email}`, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: err.response.data.message,
          });
        } else {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: "Something went wrong!",
          });
        }
      });
  };

  const fetchUserSalt = async () => {
    return instance
      .get(`/salt?email=${state.email}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: err.response.data.message,
          });
        } else {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: "Something went wrong!",
          });
        }
      });
  };

  return (
    <>
      <LoginForm
        emailInputHandler={(email) => {
          dispatch({ type: "set_email", payload: email });
        }}
        passwordInputHandler={(password) => {
          dispatch({ type: "set_password", payload: password });
        }}
        formSubmitHandler={formSubmitHandler}
        error={state.error}
        status={state.status}
      />
    </>
  );
}

export default Login;
