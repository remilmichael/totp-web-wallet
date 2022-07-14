import Logo from "../../assets/logo.svg";

function AddTokenForm() {
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
            <input type="text" className="form-control form_control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-5">
            <p className="mt-3">
              <strong>Account Name</strong>
            </p>
          </div>
          <div className="col-sm-7">
            <input type="text" className="form-control form_control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-5">
            <p className="mt-3">
              <strong>Secret Key</strong>
            </p>
          </div>
          <div className="col-sm-7">
            <input type="tel" className="form-control form_control" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-7 offset-sm-5">
            <input type="button" className="btn btn_theme" value="Add" />
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
