import { Link } from "react-router-dom";

function AboutBreadCrumb() {
  return (
    <div className="top_hd">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About Us
            </li>
          </ol>
        </nav>
        <h1>About Us</h1>
      </div>
    </div>
  );
}

export default AboutBreadCrumb;
