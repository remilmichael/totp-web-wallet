import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

function Dashboard() {
  const navigate = useNavigate();
  const credential = useSelector((state) => state.credential);

  React.useEffect(() => {
    if (!credential.encKey) {
      navigate("/");
    }
  }, [credential.encKey, navigate]);

  return (
    <>
      <div>
        Dashboard
        <Link to="/logout">Logout</Link>
      </div>
    </>
  );
}

export default Dashboard;
