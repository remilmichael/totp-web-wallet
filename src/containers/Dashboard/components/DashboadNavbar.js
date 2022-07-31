import React from "react";
import { Link } from "react-router-dom";
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";

function DashboardNavbar() {

  const [showModal, setShowModal] = React.useState(false);
  const [updateRunning, setUpdateRunning] = React.useState(false);

  // to keep showing the modal and spinner while response
  // from the server, in case the user 
  // clicks somewhere else on the screen
  React.useEffect(() => {
    if (updateRunning && !showModal) {
      setShowModal(true);
    }
  }, [showModal, updateRunning])

  const changePassBtnHandler = (event) => {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <>
      <div className="link_bx">
        <ul>
          <li>
            <Link to="/addtoken">Add Token</Link>
          </li>
          <li>
            <a
              data-bs-toggle="modal"
              href="/#"
              onClick={(e) => changePassBtnHandler(e)}
            >
              Change Password
            </a>
          </li>
        </ul>
      </div>
      <div className="cf"></div>

      <ChangePasswordModal show={showModal} onHide={() => setShowModal(false)} setUpdateRunning={setUpdateRunning} />
    </>
  );
}

export default DashboardNavbar;
