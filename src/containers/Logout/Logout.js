import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, instance } from "../../constants";
import { updateCredential } from "../../reducers/credential";

function Logout() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const credential = useSelector((state) => state.credential);

  const clearCookie = React.useCallback(async () => {
    return instance
      .get("/logout", { withCredentials: true })
      .then((resp) => {})
      .finally(() => {
        reduxDispatch(
          updateCredential({
            email: null,
            encKey: null,
          })
        );
        clearLocalStorage();
        navigate("/");
      });
  }, [navigate, reduxDispatch]);

  React.useEffect(() => {
    if (!credential.encKey) {
      navigate("/");
    } else {
        clearCookie();
    }
  }, [clearCookie, credential.encKey, navigate]);

  return null;
}

export default Logout;
