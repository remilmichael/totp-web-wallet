import Pic1 from "../../assets/pic-1.svg";
import Pic2 from "../../assets/pic-2.svg";
import Pic3 from "../../assets/pic-3.svg";
import Pic4 from "../../assets/pic-4.svg";

function HomeContent() {
  return (
    <div className="container" style={{background: "#fff"}}>
      <div className="top_content">
        <div className="row">
          <div className="col-md-6">
            <h2>What is C-Auth?</h2>
            <p>
              <strong>C-Auth</strong> is a web-based TOTP (Time-based one-time
              password) wallet, which means you can access your OTPs on the web
              browser. It generates random OTPs (One-Time Passwords) based on
              the secret exchanged while adding a new account and the current
              time. Our application has E2E (End-to-End) encryption support,
              which means we don't have access to any sensitive information you
              have, which includes passwords and TOTP seeds.
            </p>
            <p>
              <strong>C-Auth</strong> uses SRP (Secure Remote Password)
              protocol to authenticate users. We have also enabled the autologin
              feature without breaking the end-to-end encryption. You don't have
              to log in to the application by typing your username and password
              every time you try to access the application. The OTPs generated
              by the application are commonly used for two-factor authentication
              (2FA).
            </p>
          </div>
          <div className="col-md-6">
            <figure className="home_pic">
              <img src={Pic1} alt="" />
            </figure>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="sub_content">
            <figure>
              <img src={Pic2} alt="" />
            </figure>
            <h3>
              End-to-End <br />
              encryption
            </h3>
            <p>
              When an C-AUTH client makes a request to the resource server, the
              resource server needs some way to verify the access token. The
              C-AUTH core spec doesn’t define a specific method of how the
              resource server should verify access tokens, just mentions that it
              requires coordination between the resource and authorization
              servers.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="sub_content">
            <figure>
              <img src={Pic3} alt="" />
            </figure>
            <h3>
              Safe and
              <br />
              secure access
            </h3>
            <p>
              It specifies a process for resource owners to authorize
              third-party access to their server resources without providing
              credentials.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="sub_content">
            <figure>
              <img src={Pic4} alt="" />
            </figure>
            <h3>
              Modern <br />
              User Interface
            </h3>
            <p>
              Through high-level overviews, step-by-step instructions, and
              real-world examples, you will learn how to take advantage of the
              C-AUTH framework while building a secure API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
