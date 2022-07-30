import React from "react";
import { Modal } from "react-bootstrap";
import RevProgressBar from "../../../components/ReverseProgressBar/RevProgressBar";
import { capitalizeFirstLetter } from "../../../constants";

function OtpModal(props) {
  const { credential } = props;
  const { otpObj, account, username } = credential;
  const [otp, setOtp] = React.useState("");
  const intervalRef = React.useRef(null);

  const runInterval = React.useCallback(() => {
    intervalRef.current = setInterval(() => {
      setOtp(otpObj.generate());
    }, 30000)
  }, [otpObj]);

  React.useEffect(() => {
    const secondsNow = new Date().getSeconds();
    const refreshTime = 30 - (secondsNow % 30);
    const timeOutTimer = setTimeout(() => {
      setOtp(otpObj.generate());
      runInterval();
    }, refreshTime * 1000);

    setOtp(otpObj.generate());
    return () => {
      clearTimeout(timeOutTimer);
      clearTimeout(intervalRef.current);
    };
  }, [otpObj, runInterval]);

  if (!otpObj) {
    return null;
  }

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="bx_popup">
            <h2>{capitalizeFirstLetter(account)}</h2>
            <p>
              <strong>{username}</strong>
            </p>
            <span className="number">{otp}</span>
            <div className="cf"></div>
            <input type="button" value="Delete" className="btn btn_theme" />
          </div>
          <RevProgressBar />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OtpModal;
