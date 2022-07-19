import { Modal } from "react-bootstrap";
import { capitalizeFirstLetter } from "../../../constants";

function OtpModal(props) {

  const token = props.token;

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
            <span className="number">{token.otp}</span>
            <div className="cf"></div>
            <input type="button" value="Delete" className="btn btn_theme" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OtpModal;
