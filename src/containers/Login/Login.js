import React from "react";
import LoginForm from "./LoginForm";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <>
      <LoginForm
        emailInputHandler={(email) => setEmail(email)}
        passwordInputHandler={(password) => setPassword(password)}
      />
    </>
  );
}

export default Login;
