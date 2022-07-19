import React from "react";
import { capitalizeFirstLetter } from "../../../constants";
import OtpModal from "./OtpModal";
import CryptoJs from "crypto-js";
import * as OTPAuth from 'otpauth';

function TokenItem(props) {
  const { tokens, decryptKey } = props;

  const [show, setShow] = React.useState(false);

  const [tokenUi, setTokenUi] = React.useState([]);

  const [tokenItem, setTokenItem] = React.useState(null);

  const viewOtpHandler = React.useCallback((index) => {

    const encryptedKey = tokens[index].secretKey;
    
    // key decryption
    const decryptedSecret = CryptoJs.AES.decrypt(
      encryptedKey,
      decryptKey
    ).toString(CryptoJs.enc.Utf8);
    
    let totp = new OTPAuth.TOTP({
      issuer: 'ACME',
      label: 'AzureDiamond',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: decryptedSecret
    });

    const obj = {
      account: tokens[index].account,
      username: tokens[index].username,
      otp: totp.generate()
    }
    setShow(true);
    setTokenItem(obj);
  }, [tokens,decryptKey]);

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

    
  }, [tokens, viewOtpHandler, tokenUi])

  React.useEffect(() => {
    setTokenUi(createUiElements());
  }, [createUiElements])

  if (tokens.length === 0) {
    return null;
  }  

  return (
    <>
      {tokenUi}
      <OtpModal show={show} onHide={() => setShow(!show)} token={tokenItem} />
    </>
  );
}

export default TokenItem;
