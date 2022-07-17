import React from "react";
import OtpModal from "./OtpModal";

function TokenItem() {
  const [show, setShow] = React.useState(false);

  const viewOtpHandler = () => {
    setShow(!show);
  };

  const items = (
    <div className="company_bx">
      <h3 className="mb-4">Company Name</h3>
      <div className="bx">
        <div className="bx_row">
          <div className="row">
            <div className="col-8">
              <p className="mt-2">
                <strong>Account 1</strong>
              </p>
            </div>
            <div className="col-4">
              <input
                type="button"
                value="View"
                className="btn btn_theme"
                onClick={() => viewOtpHandler()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {items}
      <OtpModal show={show} onHide={() => viewOtpHandler()} />
    </>
  );
}

export default TokenItem;
