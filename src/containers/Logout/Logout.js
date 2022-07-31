import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage, instance } from "../../constants";
import { clearCredential } from "../../reducers/credential";

function Logout() {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const credential = useSelector((state) => state.credential);
  
  const queryParamRef = React.useRef(new URLSearchParams(window.location.search));

  const clearCookie = React.useCallback(async () => {
    return instance
      .get("/logout", { withCredentials: true })
      .then((resp) => {})
      .finally(() => {
        reduxDispatch(
          clearCredential()
        );
        clearLocalStorage();
        if (queryParamRef.current.get("redirect") === "login") {
          navigate("/login");
        } else {
          navigate("/");
        }
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
