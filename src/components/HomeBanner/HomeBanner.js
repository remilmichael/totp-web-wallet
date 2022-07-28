import { Link } from "react-router-dom";
import Banner from '../../assets/banner.svg';

function HomeBanner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-content-center flex-wrap">
            <h1>A secure End-to-end encrypted TOTP wallet</h1>
            <Link to="/register" className="bttn nav-link btn btn_theme">
              Create Account
            </Link>
          </div>
          <div className="col-md-6">
            <figure className="banner_pic">
              <img src={Banner} alt="homepage banner" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
