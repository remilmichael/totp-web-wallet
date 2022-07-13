import React, { useState } from "react";
import Form from "./RegisterForm";
import CryptoJs from "crypto-js";
import { instance, rfc5054 } from "../../constants";
// import { useSelector } from "react-redux";


export const registerStatus = {
  REGISTER_IDLE: 'REGISTER_IDLE',
  REGISTER_INIT: 'REGISTER_INIT',
  REGISTER_FAILED: 'REGISTER_FAILED',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS'
}

function Register() {
  // const state = useSelector((state) => state.credential);
  // console.log(state);

  const SRP6JavascriptClientSession = require("thinbus-srp/browser")(
    rfc5054.N_base10,
    rfc5054.g_base10,
    rfc5054.k_base16
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(registerStatus.REGISTER_IDLE);

  const formSubmitHandler = async () => {
    if (password !== confirmPass) {
      setError("Passwords don't match");
    } else {
      setStatus(registerStatus.REGISTER_INIT)
      const response = await instance.get(`/check-username?email=${email}`);
      if (!response) {
        setError("Something went wrong");
        setStatus(registerStatus.REGISTER_FAILED)
      } else if (response.data.userExist) {
        setError("Email already exists");
        setStatus(registerStatus.REGISTER_FAILED)
      } else {
        const credentialsObj = generateCredentials();
        instance.post(`/register`, credentialsObj).then((response) => {
          setStatus(registerStatus.REGISTER_SUCCESS)
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.message) {
            setStatus(registerStatus.REGISTER_FAILED)
            setError("Registration failed. Something went wrong!");
          }
        })
      }
    }
  };

  const generateCredentials = () => {
    const salt = CryptoJs.lib.WordArray.random(128 / 8);
    const key256Bits = CryptoJs.PBKDF2(
      email + password + new Date().getTime(),
      salt,
      {
        keySize: 256 / 32,
      }
    );
    const encryptedKey = CryptoJs.AES.encrypt(key256Bits.toString(), password);
    const hmac = CryptoJs.HmacSHA256(encryptedKey.toString(), email + password); // add salt later
    const finalKey = hmac.toString() + encryptedKey.toString();

    const client = new SRP6JavascriptClientSession();
    const saltForVerifier = client.generateRandomSalt();
    const verifier = client.generateVerifier(saltForVerifier, email, password);

    return {
      email,
      salt: saltForVerifier,
      verifier,
      encKey: finalKey,
    };
  };

  return (
    <Form
      emailInputHandler={(input) => setEmail(input)}
      passwordInputHandler={(input) => setPassword(input)}
      confirmPassHandler={(input) => setConfirmPass(input)}
      formSubmitHandler={formSubmitHandler}
      error={error}
      status={status}
    />
  );
}

export default Register;
