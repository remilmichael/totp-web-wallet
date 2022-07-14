import React from "react";
import AddTokenForm from "./AddTokenForm";
import { reducer, initialState, addTokenActions } from "./reducer";
import { instance } from "../../constants";

function AddToken() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const usernameHandler = (username) => {
    dispatch({ type: "set_username", payload: username });
  };

  const accountNameHandler = (accountName) => {
    dispatch({ type: "set_account", payload: accountName });
  };

  const secretKeyHandler = (secretKey) => {
    dispatch({ type: "set_totpkey", payload: secretKey });
  };

  const addTokenHandler = () => {
    const validationError = validateInputs();
    if (validationError) {
      dispatch({ type: "error", payload: validationError });
    } else {
      dispatch({ type: addTokenActions.ADTOKEN_INIT });
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

  const postSecretKeys = async (data) => {
    return instance.post("/secret/add", data, { withCredentials: true })
        .then(resp => {

        })
        .catch(err => {
            
        })
  };

  return (
    <AddTokenForm
      usernameHandler={usernameHandler}
      accountNameHandler={accountNameHandler}
      secretKeyHandler={secretKeyHandler}
      addTokenHandler={addTokenHandler}
      error={state.error}
    />
  );
}

export default AddToken;
