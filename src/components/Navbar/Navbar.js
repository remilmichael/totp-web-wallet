import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const [offCanvas, setOffCanvas] = React.useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="d-flex bd-highlight">
          <div className="me-auto bd-highlight align-self-center">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="C-Auth Logo" />
              </Link>
            </div>
          </div>
          <div className="bd-highlight">
            <nav className="navbar navbar-expand-lg bd-highlight">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                onClick={() => setOffCanvas(!offCanvas)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={offCanvas ? 'offcanvas offcanvas-end show' : 'offcanvas offcanvas-end'}
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                {...offCanvas ? {"aria-modal": true, "role": "dialog"} : null}
              >
                <div className="offcanvas-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => setOffCanvas(false)}
                  ></button>
                </div>
                <div className="d-flex menu_links">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link
                        to="/"
                        aria-current="page"
                        className={
                          path === "/" ? "nav-link active" : "nav-link"
                        }
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/about"
                        aria-current="page"
                        className={
                          path === "/about" ? "nav-link active" : "nav-link"
                        }
                      >
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/faq"
                        aria-current="page"
                        className={
                          path === "/faq" ? "nav-link active" : "nav-link"
                        }
                      >
                        FAQ's
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        aria-current="page"
                        className={
                          path === "/contact" ? "nav-link active" : "nav-link"
                        }
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                  <div className="right_nav align-self-center">
                    <ul>
                      <li>
                        <Link
                          to="/login"
                          aria-current="page"
                          className="nav-link link_right"
                        >
                          Sign in
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          aria-current="page"
                          className="nav-link btn btn_theme"
                        >
                          Create Account
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {offCanvas ? <div className="offcanvas-backdrop fade show"></div> : null}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
