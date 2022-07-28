import { Link } from "react-router-dom";

function BreadCrumb(props) {
  const { name, desc } = props;

  return (
    <div className="top_hd">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <h1>{desc}</h1>
      </div>
    </div>
  );
}

export default BreadCrumb;
