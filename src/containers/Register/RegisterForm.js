import React from "react";

function RegisterForm(props) {
  // destructure
  const {
    emailInputHandler,
    passwordInputHandler,
    confirmPassHandler,
    formSubmitHandler,
  } = props;

  function submitForm(e) {
    e.preventDefault();
    formSubmitHandler();
  }

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => emailInputHandler(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => passwordInputHandler(e.target.value)}
        />
        <label htmlFor="confirmPass">Confirm Password:</label>
        <input
          type="password"
          id="confirmPass"
          onChange={(e) => confirmPassHandler(e.target.value)}
        />
        <input type="submit" onClick={(e) => submitForm(e)} />
      </form>
    </>
  );
}

export default RegisterForm;