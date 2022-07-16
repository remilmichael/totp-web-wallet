import { Link } from "react-router-dom";

function TopNavbar() {
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
              data-bs-target="#exampleModal-1"
              onClick={(e) => e.preventDefault()}
            >
              Change Password
            </a>
          </li>
        </ul>
      </div>
      <div className="cf"></div>
    </>
  );
}

export default TopNavbar;
