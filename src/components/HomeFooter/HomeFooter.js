import { Link } from "react-router-dom";
import FooterLogo from '../../assets/footer-logo.svg';

function HomeFooter() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-content-center flex-wrap">
              <div className="footer_logo">
                <img src={FooterLogo} alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ’s</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Subscribe to Our Newsletter</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Address"
                />
                <span className="input-group-text">
                  <button className="bttn btn btn_theme" type="submit">
                    Subscribe
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer_bottom">
        <div className="container">
          <p>©2022 C-AUTH. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
}

export default HomeFooter;
