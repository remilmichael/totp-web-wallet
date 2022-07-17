import { Modal } from "react-bootstrap";

function OtpModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div class="bx_popup">
            <h2>Company Name</h2>
            <p>
              <strong>Account 1</strong>
            </p>
            <span class="number">1 2 3 4 5 6</span>
            <div class="cf"></div>
            <input type="button" value="Delete" class="btn btn_theme" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OtpModal;
