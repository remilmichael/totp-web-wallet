import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";

function AddTokenForm(props) {
  const {
    usernameHandler,
    accountNameHandler,
    secretKeyHandler,
    addTokenHandler,
    error,
  } = props;

  const navigate = useNavigate();

  return (
    <>
      <div className="sign_wrap add_wrap align-self-center">
        <figure className="sign_logo">
          <img src={Logo} alt="" />
        </figure>
        <h2 className="text-center mb-4">Add Token</h2>
        <div className="row mb-3">
          <div className="col-sm-5">
            <p className="mt-3">
              <strong>Username</strong>
            </p>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form_control"
              onChange={(e) => usernameHandler(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-5">
            <p className="mt-3">
              <strong>Account</strong>
            </p>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form_control"
              onChange={(e) => accountNameHandler(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-5">
            <p className="mt-3">
              <strong>Secret Key</strong>
            </p>
          </div>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control form_control"
              onChange={(e) => secretKeyHandler(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <div className="row mb-3">
            <div className="col-sm-7 offset-sm-5 ">
              <div
                className="mx-auto alert alert-danger alert text-center"
                role="alert">{error}</div>
            </div>
          </div>
        ) : null}
        <div className="row mb-3">
          <div className="col-sm-7 offset-sm-5 ">
            <div className="d-flex justify-content-evenly">
              <input
                type="button"
                className="btn btn_theme"
                value="Add"
                onClick={() => addTokenHandler()}
              />
              <input
                type="button"
                className="btn btn_theme"
                value="Cancel"
                onClick={() => navigate(-1)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-bottom copy">
        <p className="text-center">© 2022 C-AUTH. All Rights Reserved.</p>
      </div>
    </>
  );
}

export default AddTokenForm;
