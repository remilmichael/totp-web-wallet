import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./App.css";
import React from "react";
import {
  AUTH_TOKEN_NAME,
  clearLocalStorage,
  DECRYPT_KEY_ID,
  instance,
  TEMP_DECRYPT_KEY,
} from "./constants";

function App() {
  React.useEffect(() => {
    const expiry = localStorage.getItem(AUTH_TOKEN_NAME);
    const tempDecryptKey = localStorage.getItem(TEMP_DECRYPT_KEY);
    const decryptKeyId = localStorage.getItem(DECRYPT_KEY_ID);

    if (expiry && tempDecryptKey && decryptKeyId) {
      const expiryDt = new Date(expiry * 1000);
      if (new Date() > expiryDt) {
        clearLocalStorage();
      } else {
        fetchKey(decryptKeyId);
      }
    }
  }, []);

  const fetchKey = async (keyId) => {
    return instance.get(`/autologin/get?id=${keyId}`, {
      withCredentials: true,
    })
    .then(resp => {
      
    })
    .catch(err => {

    })
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
