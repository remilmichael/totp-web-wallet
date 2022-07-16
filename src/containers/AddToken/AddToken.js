import React from "react";
import AddTokenForm from "./AddTokenForm";
import { reducer, initialState, addTokenActions } from "./reducer";
import { instance } from "../../constants";
import { v4 as uuidv4} from 'uuid'
import { useSelector } from "react-redux";
import CryptoJs from "crypto-js";
import { useNavigate } from "react-router-dom";

function AddToken() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const credential = useSelector((state) => state.credential);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (credential.fetch && !credential.encKey) {
      navigate("/");
    }
  }, [credential.encKey, navigate, credential.fetch]);


  const usernameHandler = (username) => {
    dispatch({ type: "set_username", payload: username });
  };

  const accountNameHandler = (accountName) => {
    dispatch({ type: "set_account", payload: accountName });
  };

  const secretKeyHandler = (secretKey) => {
    dispatch({ type: "set_totpkey", payload: secretKey });
  };

  const addTokenHandler = async() => {
    const validationError = validateInputs();
    if (validationError) {
      dispatch({ type: "error", payload: validationError });
    } else {
      dispatch({ type: addTokenActions.ADTOKEN_INIT });
      
      const encryptedDataObj = encryptSecrets();

      await postSecretKeys(encryptedDataObj);

    }
  };

  const validateInputs = () => {
    if (!state.username) {
      return "Username can't be empty. Type something that resembles your actual username or the username itself.";
    } else if (!state.account) {
      return "Account can't be empty. Type something that resembles the application where the OTP will be used.";
    } else if (!state.totpKey) {
      return "TOTP Secret key can't be empty";
    }
    return null;
  };

  const encryptSecrets = () => {
    const encryptedTotpKey = CryptoJs.AES.encrypt(state.totpKey, credential.encKey);
    const hmac = CryptoJs.HmacSHA256(
      encryptedTotpKey.toString(),
      credential.encKey
    );
    const keyWithHash = hmac.toString() + encryptedTotpKey.toString();

    const dataObj = {
      uuid: uuidv4(),
      secretKey: keyWithHash,
      username: state.username,
      account: state.account,
    };

    return dataObj;
  }

  const postSecretKeys = async (data) => {
    return instance.post("/secret/add", data, { withCredentials: true })
        .then(resp => {
          dispatch({ type: addTokenActions.ADTOKEN_SUCCESS })
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.message) {
            dispatch({ type: addTokenActions.ADTOKEN_FAILED, payload: err.response.data.message })
          } else {
            dispatch({ type: addTokenActions.ADTOKEN_FAILED, payload: 'Something went wrong!' })
          }
        })
  };

  return (
    <AddTokenForm
      usernameHandler={usernameHandler}
      accountNameHandler={accountNameHandler}
      secretKeyHandler={secretKeyHandler}
      addTokenHandler={addTokenHandler}
      error={state.error}
      status={state.status}
    />
  );
}

export default AddToken;
