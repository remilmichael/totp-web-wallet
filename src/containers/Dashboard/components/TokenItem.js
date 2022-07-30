import React from "react";
import { capitalizeFirstLetter } from "../../../constants";
import OtpModal from "./OtpModal";
import CryptoJs from "crypto-js";
import * as OTPAuth from "otpauth";

function TokenItem(props) {
  const { tokens, decryptKey, deleteTokenHandler } = props;

  const [show, setShow] = React.useState(false);

  const [tokenUi, setTokenUi] = React.useState([]);

  const [tokenItem, setTokenItem] = React.useState(null);

  const deleteBtnHandler = () => {
      deleteTokenHandler(tokenItem);
  }

  const viewOtpHandler = React.useCallback(
    (index) => {
      const encryptedKey = tokens[index].secretKey;

      // key decryption
      const decryptedSecret = CryptoJs.AES.decrypt(
        encryptedKey,
        decryptKey
      ).toString(CryptoJs.enc.Utf8);
      let totp = null;
      try {
        totp = new OTPAuth.TOTP({
          issuer: tokens[index].account,
          label: tokens[index].username,
          algorithm: "SHA1",
          digits: 6,
          period: 30,
          secret: decryptedSecret,
        });
        const obj = {
          uuid: tokens[index].uuid,
          account: tokens[index].account,
          username: tokens[index].username,
          otpObj: totp,
        };
        setTokenItem(obj);
        setShow(true);
      } catch (err) {
        console.log("something went wrong");
        alert("Something went wrong");
      }
    },
    [tokens, decryptKey]
  );

  const createUiElements = React.useCallback(() => {
    if (tokenUi.length === 0) {
      return tokens.map((token, index) => {
        return (
          <div className="company_bx" key={index}>
            <h3 className="mb-4">{capitalizeFirstLetter(token.account)}</h3>
            <div className="bx">
              <div className="bx_row">
                <div className="row">
                  <div className="col-8">
                    <p className="mt-2">
                      <strong>{token.username}</strong>
                    </p>
                  </div>
                  <div className="col-4">
                    <input
                      type="button"
                      value="View"
                      className="btn btn_theme"
                      onClick={() => viewOtpHandler(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return tokenUi;
    }
  }, [tokens, viewOtpHandler, tokenUi]);

  React.useEffect(() => {
    setTokenUi(createUiElements());
  }, [createUiElements]);

  if (tokens.length === 0) {
    return null;
  }

  return (
    <>
      {tokenUi}
      {tokenItem && show ? (
        <OtpModal
          show={show}
          onHide={() => setShow((show) => !show)}
          credential={tokenItem}
          deleteTokenHandler={deleteBtnHandler}
        />
      ) : null}
    </>
  );
}

export default TokenItem;
