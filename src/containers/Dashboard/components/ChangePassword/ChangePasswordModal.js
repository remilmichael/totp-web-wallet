import React from "react";
import Spinner from "../../../../components/Spinner/Spinner";
import { Alert, Modal } from "react-bootstrap";
import {
  CHANGE_PASSWORD_MESSAGE,
  generateCredentials,
  instance,
} from "../../../../constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJs from "crypto-js";

const uiStatus = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

function ChangePasswordModal(props) {
  const { show, onHide, setUpdateRunning } = props;
  const navigate = useNavigate();
  const credential = useSelector((state) => state.credential);
  const [status, setStatus] = React.useState(uiStatus.IDLE);
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [error, setError] = React.useState("");

  const changePassBtnHandler = () => {
    if (newPass.length < 8) {
      setError("Password should be at least 8 characters");
    } else if (newPass !== confirmPass) {
      setError("Passwords does not match!");
    } else {
      setError("");
      setStatus(uiStatus.RUNNING);
      setUpdateRunning(true);

      // newCredentials has updated encryption which will break
      // rest of the encrypted secrets
      const newCredentials = generateCredentials(credential.email, newPass);

      // encrypting old encryption key with new password
      const encryptedKey = CryptoJs.AES.encrypt(
        credential.encKey,
        newPass
      );
      const hmac = CryptoJs.HmacSHA256(
        encryptedKey.toString(),
        credential.email + newPass
      );
      const finalKey = hmac.toString() + encryptedKey.toString();
      
      // replace new key with old key encrypted with new password
      newCredentials.encKey = finalKey;

      instance
        .post("/change-password", newCredentials, {
          withCredentials: true,
        })
        .then(() => {
          localStorage.setItem(
            CHANGE_PASSWORD_MESSAGE,
            "Password changed successfully."
          );
          setStatus(uiStatus.SUCCESS);
          setUpdateRunning(false);
          navigate("/logout?redirect=login");
        })
        .catch((err) => {
          setUpdateRunning(false);
          setStatus(uiStatus.FAILED);
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Internal Server Error.");
          }
        });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="bx_popup">
            {status === uiStatus.RUNNING ? (
              <Spinner />
            ) : (
              <>
                <h2>Change Password</h2>
                <div className="row mb-3">
                  <div className="col-sm-5">
                    <p className="mt-3 text-left float-start">
                      <strong>New Password</strong>
                    </p>
                  </div>
                  <div className="col-sm-7">
                    <input
                      type="password"
                      className="form-control chg_password_input"
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-5">
                    <p className="mt-3 text-left float-start">
                      <strong>Confirm Password</strong>
                    </p>
                  </div>
                  <div className="col-sm-7">
                    <input
                      type="password"
                      className="form-control chg_password_input"
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  type="button"
                  value="Change Password"
                  className="btn btn_theme"
                  onClick={changePassBtnHandler}
                />
              </>
            )}
          </div>
          {error ? (
            <Alert
              variant="danger"
              style={{ textAlign: "center", width: "85%", margin: "auto" }}
            >
              {error}
            </Alert>
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;
