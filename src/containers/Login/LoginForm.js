function LoginForm(props) {

    const {
        emailInputHandler,
        passwordInputHandler,
        formSubmitHandler
    } = props;

  function submitForm(e) {
    e.preventDefault();
    formSubmitHandler();
  }

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" onChange={(e) => emailInputHandler(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" onChange={(e) => passwordInputHandler(e.target.value)} />
      <input type="submit" value="Login" onClick={(e) => submitForm(e)} />
    </form>
  );
}

export default LoginForm;
