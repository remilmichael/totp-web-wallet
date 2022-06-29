import axios from "axios";
import React from "react";
import LoginForm from "./LoginForm";
import { API_URL, rfc5054 } from "../../constants";

const SRP6JavascriptClientSession = require("thinbus-srp/browser")(
  rfc5054.N_base10,
  rfc5054.g_base10,
  rfc5054.k_base16
);

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const formSubmitHandler = async () => {
    const serverChallenge = await fetchUserSalt();
    if (!serverChallenge) {
    } else {
      const { salt, b } = serverChallenge;
      const client = new SRP6JavascriptClientSession();
      client.step1(email, password);
      const { A, M1 } = client.step2(salt, b);
      

      axios.post(`${API_URL}/login`, {
        email: email,
        a: A,
        m1: M1
      }, {
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
    }
  };

  const fetchUserSalt = async () => {
    try {
      const response = await axios.get(`${API_URL}/salt?email=${email}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoginForm
        emailInputHandler={(email) => setEmail(email)}
        passwordInputHandler={(password) => setPassword(password)}
        formSubmitHandler={formSubmitHandler}
      />
    </>
  );
}

export default Login;
