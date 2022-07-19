import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { autologinFetchStatus } from "../../reducers/credential";
import DashboardComponents from "./DashboardComponents";

function Dashboard() {
  const navigate = useNavigate();
  const credential = useSelector((state) => state.credential);

  React.useEffect(() => {
    if (
      credential.fetch === autologinFetchStatus.FETCH_SUCCESS &&
      !credential.encKey
    ) {
      navigate("/");
    } else if (credential.fetch === autologinFetchStatus.FETCH_CLEAR) {
      navigate("/");
    }
  }, [credential.encKey, navigate, credential.fetch]);

  return (
    <>
      <DashboardComponents />
    </>
  );
}

export default Dashboard;
