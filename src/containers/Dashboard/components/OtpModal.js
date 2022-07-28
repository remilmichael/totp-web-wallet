import { Modal } from "react-bootstrap";
import RevProgressBar from "../../../components/ReverseProgressBar/RevProgressBar";
import { capitalizeFirstLetter } from "../../../constants";

function OtpModal(props) {

  const token = props.token;
  const secondsNow = new Date().getSeconds();
  let refreshTime = 30 - (secondsNow % 30);
  

  console.log("render")

  setTimeout(() => {
    console.log(new Date().getTime())
  }, refreshTime * 1000);

  if (!token) {
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
            <h2>{capitalizeFirstLetter(token.account)}</h2>
            <p>
              <strong>{token.username}</strong>
            </p>
            <span className="number"></span>
            <div className="cf"></div>
            <input type="button" value="Delete" className="btn btn_theme" />
          </div>
          <RevProgressBar animationDuration={refreshTime} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OtpModal;
