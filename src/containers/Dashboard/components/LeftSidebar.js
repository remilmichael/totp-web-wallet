import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import UserLogo from "../../../assets/user.svg";

function LeftSidebar({ username }) {

  const navigate = useNavigate()

  const logoutStyleNoHover = {
    backgroundImage: `url('/images/logout-icon.svg')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "90%",
    backgroundColor: "#fff",
  };

  const logoutStyleOnHover = {
    backgroundImage: `url('/images/logout-icon-active.svg')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "90%",
    backgroundColor: "#6c53e0",
  };

  const [logoutStyle, setLogoutStyle] = React.useState(logoutStyleNoHover);

  return (
    <aside className="side_bx text-center">
      <figure className="sign_logo">
        <img src={Logo} alt="" />
      </figure>
      <figure className="avatar">
        <img src={UserLogo} alt="" />
      </figure>
      <h2 className="text-center">{username}</h2>
      <input
        type="submit"
        value="Logout"
        className="logout"
        onMouseEnter={() => setLogoutStyle(logoutStyleOnHover)}
        onMouseLeave={() => setLogoutStyle(logoutStyleNoHover)}
        style={logoutStyle}
        onClick={() => navigate("/logout")}
      />
    </aside>
  );
}

export default LeftSidebar;
