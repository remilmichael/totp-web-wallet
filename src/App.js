import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./App.css";
import React from "react";
import CryptoJs from "crypto-js";
import { useDispatch } from "react-redux";
import {
  AUTH_TOKEN_NAME,
  clearLocalStorage,
  DECRYPT_KEY_ID,
  instance,
  TEMP_DECRYPT_KEY,
  USERNAME,
} from "./constants";
import {
  autologinFetchStatus,
  updateCredential,
  updateFetchStatus,
} from "./reducers/credential";
import Spinner from "./components/Spinner/Spinner";
import NoMatchFound from "./NoMatch";
import Logout from "./containers/Logout/Logout";
import AddToken from "./containers/AddToken/AddToken";
import AboutUs from "./About";
import Faq from "./Faq";
import ContactUs from "./ContactUs";

const status = {
  FETCH_IDLE: "FETCH_IDLE",
  FETCH_RUNNING: "FETCH_RUNNING",
};

function App() {
  const [fetchStatus, setFetchStatus] = React.useState(status.FETCH_IDLE);
  const reduxDispatch = useDispatch();

  const fetchKey = React.useCallback(
    async (email, keyId, tempDecryptKey) => {
      return instance
        .get(`/autologin/get?id=${keyId}`, {
          withCredentials: true,
        })
        .then((resp) => {
          if (resp.data.encKey) {
            const encKey = resp.data.encKey;

            const hmac = encKey.substring(0, 64);
            const encryptedKey = encKey.substring(64, encKey.length);
            const computedHmac = CryptoJs.HmacSHA256(
              encryptedKey,
              tempDecryptKey
            );

            if (computedHmac.toString() === hmac) {
              const secretKey = CryptoJs.AES.decrypt(
                encryptedKey,
                tempDecryptKey
              ).toString(CryptoJs.enc.Utf8);
              reduxDispatch(
                updateCredential({
                  email: email,
                  encKey: secretKey,
                })
              );
              setFetchStatus(status.FETCH_IDLE);
            } else {
              // error - key tampered
              clearLocalStorage();
              setFetchStatus(status.FETCH_IDLE);
              reduxDispatch(
                updateFetchStatus({
                  status: autologinFetchStatus.FETCH_CLEAR,
                })
              );
            }
          } else {
            clearLocalStorage();
            setFetchStatus(status.FETCH_IDLE);
            reduxDispatch(
              updateFetchStatus({
                status: autologinFetchStatus.FETCH_CLEAR,
              })
            );
          }
        })
        .catch((err) => {
          setFetchStatus(status.FETCH_IDLE);
          reduxDispatch(
            updateFetchStatus({
              status: autologinFetchStatus.FETCH_CLEAR,
            })
          );
          console.log(err);
          clearLocalStorage();
        });
    },
    [reduxDispatch]
  );

  React.useEffect(() => {
    setFetchStatus(status.FETCH_RUNNING);
    reduxDispatch(
      updateFetchStatus({
        status: autologinFetchStatus.FETCH_RUNNING,
      })
    );

    const expiry = localStorage.getItem(AUTH_TOKEN_NAME);
    const tempDecryptKey = localStorage.getItem(TEMP_DECRYPT_KEY);
    const decryptKeyId = localStorage.getItem(DECRYPT_KEY_ID);
    const email = localStorage.getItem(USERNAME);

    if (expiry && tempDecryptKey && decryptKeyId && email) {
      const expiryDt = new Date(expiry * 1000);
      if (new Date() > expiryDt) {
        clearLocalStorage();
        setFetchStatus(status.FETCH_IDLE);
        reduxDispatch(
          updateFetchStatus({
            status: autologinFetchStatus.FETCH_CLEAR,
          })
        );
      } else {
        fetchKey(email, decryptKeyId, tempDecryptKey);
      }
    } else {
      clearLocalStorage();
      setFetchStatus(status.FETCH_IDLE);
      reduxDispatch(
        updateFetchStatus({
          status: autologinFetchStatus.FETCH_CLEAR,
        })
      );
    }
  }, [fetchKey, reduxDispatch]);

  return (
    <>
      {fetchStatus === status.FETCH_RUNNING ? <Spinner /> : null}
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/addtoken" element={<AddToken />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatchFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
