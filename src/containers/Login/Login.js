import { instance, rfc5054 } from "../../constants";
import React from "react";
import CryptoJs from "crypto-js";
import { useNavigate } from "react-router-dom";
import { initialState, loginActions, reducer } from "./reducer";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { saveCredential } from "../../reducers/credential";
import { v4 as uuidv4 } from "uuid";

const SRP6JavascriptClientSession = require("thinbus-srp/browser")(
  rfc5054.N_base10,
  rfc5054.g_base10,
  rfc5054.k_base16
);

function Login() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const credential = useSelector((state) => state.credential);

  React.useEffect(() => {
    if (credential.fetch && credential.encKey) {
      navigate("/dashboard");
    }
  }, [credential.encKey, navigate, credential.fetch]);

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
        if (err.response && err.response.data && err.response.data.message) {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: err.response.data.message,
          });
        } else {
          dispatch({
            type: loginActions.LOGIN_FAILED,
            payload: "Invalid credentials!",
          });
        }
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
          const key = decryptKey(data.encKey);
          if (key) {
            const resp = await createAutoLoginKey(key, credential.token_expiry);
            if (resp) {
              // LOGIN_SUCCESSFUL
              dispatch({ type: loginActions.LOGIN_SUCCESS });
              reduxDispatch(
                saveCredential({
                  email: state.email,
                  encKey: key,
                  expiry: credential.token_expiry,
                  decKey: resp.newDecKey,
                  uuid: resp.uuid
                })
              );
              navigate("/dashboard");
            }
          } else {
            dispatch({
              type: loginActions.LOGIN_FAILED,
              payload: "Critical error: Key tampered!!!",
            });
          }
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

  const decryptKey = (encKey) => {
    const hmac = encKey.substring(0, 64);
    const encryptedKey = encKey.substring(64, encKey.length);
    const computedHmac = CryptoJs.HmacSHA256(
      encryptedKey,
      state.email + state.password
    );
    if (computedHmac.toString() === hmac) {
      const secretKey = CryptoJs.AES.decrypt(
        encryptedKey,
        state.password
      ).toString(CryptoJs.enc.Utf8);
      return secretKey;
    } else {
      return null;
    }
  };

  const createAutoLoginKey = async (mainKey, expiry) => {
    const salt = CryptoJs.lib.WordArray.random(128 / 8);
    const key = CryptoJs.PBKDF2(
      state.username + state.password + new Date().getTime(),
      salt,
      {
        keySize: 256 / 32,
      }
    );
    const newEncryptedKey = CryptoJs.AES.encrypt(mainKey, key.toString());
    const hmac = CryptoJs.HmacSHA256(
      newEncryptedKey.toString(),
      key.toString()
    );
    const keyWithHash = hmac.toString() + newEncryptedKey.toString();
    const tableKey = uuidv4();

    const newSessionObj = {
      email: state.email,
      encKey: keyWithHash,
      expiry: expiry * 1000,
      uuid: tableKey,
    };

    const resp = await postSessionKey(newSessionObj);
    if (resp) {
      return {
        uuid: tableKey,
        newDecKey: key.toString(),
      }
    } else {
      return null;
    }    
  };


  const postSessionKey = async(data) => {
    return instance
      .post("/autologin/create", data, { withCredentials: true })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        dispatch({
          type: loginActions.LOGIN_FAILED,
          payload: "Unable to create a session",
        });
      });
  }

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
