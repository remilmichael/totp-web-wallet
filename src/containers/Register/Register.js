import Form from "./RegisterForm";
import React, { useState } from "react";
import CryptoJs from "crypto-js";
import axios from "axios";
import { API_URL, rfc5054 } from "../../constants";

function Register() {

  const SRP6JavascriptClientSession  = require('thinbus-srp/browser')(rfc5054.N_base10, rfc5054.g_base10, rfc5054.k_base16);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const formSubmitHandler = async () => {
    if (password !== confirmPass) {
        // error
    } else {

        const response = await axios.get(`${API_URL}/check-username?email=${email}`)
        if (!response) {
          //failed
        } else if (response.data.userExist) {
          console.log('email already exists')
        } else {
          const credentialsObj = generateCredentials();
          console.log(credentialsObj)
            axios.post(`${API_URL}/register`, credentialsObj)
              .then(response => {
                console.log(response);
              })
        }
    }
  }

  const generateCredentials = () => {
    const salt = CryptoJs.lib.WordArray.random(128 / 8);
    const key256Bits = CryptoJs.PBKDF2(email + password + new Date().getTime(), salt, {
        keySize: 256 / 32,
    });
    const encryptedKey = CryptoJs.AES.encrypt(key256Bits.toString(), password);
    const hmac = CryptoJs.HmacSHA256(encryptedKey, email + password); // add salt later
    console.log(hmac)
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
  }


  return (
    <Form
      emailInputHandler={(input) => setEmail(input)}
      passwordInputHandler={(input) => setPassword(input)}
      confirmPassHandler={(input) => setConfirmPass(input)}
      formSubmitHandler={formSubmitHandler}
    />
  );
}

export default Register;