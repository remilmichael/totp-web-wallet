import React from "react";
import { Link } from "react-router-dom";

function Home() {

  return (
    <>
      <Link to="/register">Register</Link> <Link to="/login">Login</Link>
    </>
  );
}

export default Home;
