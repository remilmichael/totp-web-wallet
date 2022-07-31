import axios from "axios";
import CryptoJs from "crypto-js";

export const API_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_PROD_API_URL;
  } else {
    return process.env.REACT_APP_DEV_API_URL;
  }
})();

export const rfc5054 = {
  N_base10:
    "21766174458617435773191008891802753781907668374255538511144643224689886235383840957210909013086056401571399717235807266581649606472148410291413364152197364477180887395655483738115072677402235101762521901569820740293149529620419333266262073471054548368736039519702486226506248861060256971802984953561121442680157668000761429988222457090413873973970171927093992114751765168063614761119615476233422096442783117971236371647333871414335895773474667308967050807005509320424799678417036867928316761272274230314067548291133582479583061439577559347101961771406173684378522703483495337037655006751328447510550299250924469288819",
  g_base10: "2",
  k_base16: "5b9e8ef059c6b32ea59fc1d322d37f04aa30bae5aa9003b8321e21ddb04e300",
};

export const instance = axios.create({
  baseURL: API_URL,
});

export const AUTH_TOKEN_NAME = "authTokenValidity";
export const TEMP_DECRYPT_KEY = "tempDecryptKey";
export const DECRYPT_KEY_ID = "decryptKeyId";
export const USERNAME = "email";
export const CHANGE_PASSWORD_MESSAGE = "passwordChange";

export function clearLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  localStorage.removeItem(TEMP_DECRYPT_KEY);
  localStorage.removeItem(DECRYPT_KEY_ID);
  localStorage.removeItem(USERNAME);
}

export function capitalizeFirstLetter(string) {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else return string;
}

export const generateCredentials = (username, password) => {

  if (!username || !password) {
    throw new Error('Require username and password');
  }

  const SRP6JavascriptClientSession = require("thinbus-srp/browser")(
    rfc5054.N_base10,
    rfc5054.g_base10,
    rfc5054.k_base16
  );

  const salt = CryptoJs.lib.WordArray.random(128 / 8);
  const key256Bits = CryptoJs.PBKDF2(
    username + password + new Date().getTime(),
    salt,
    {
      keySize: 256 / 32,
    }
  );
  const encryptedKey = CryptoJs.AES.encrypt(key256Bits.toString(), password);
  const hmac = CryptoJs.HmacSHA256(encryptedKey.toString(), username + password); // add salt later
  const finalKey = hmac.toString() + encryptedKey.toString();

  const client = new SRP6JavascriptClientSession();
  const saltForVerifier = client.generateRandomSalt();
  const verifier = client.generateVerifier(saltForVerifier, username, password);

  return {
    email: username,
    salt: saltForVerifier,
    verifier,
    encKey: finalKey,
  };
};