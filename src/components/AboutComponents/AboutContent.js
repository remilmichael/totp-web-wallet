import Pic1 from "../../assets/pic-1.svg";
import PeopleImage from "../../assets/people.jpg";

function AboutContent() {
  return (
    <>
      <div className="top_content">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">
              <h2>About C-AUTH</h2>
              <p>
                C-Auth is a web-based TOTP (Time-based one-time password)
                wallet, which means you can access your OTPs on the web browser.
                It generates random OTPs (One-Time Passwords) based on the
                secret exchanged while adding a new account and the current
                time.
              </p>
              <p>
                We kick-started the development on the 8th of May 2022 to induce
                privacy and security to the user data. We named the application
                C-Auth, the combination of Conestoga and Authentication, as a
                part of the capstone project.
              </p>
            </div>
            <div className="col-md-6">
              <figure>
                <img src={Pic1} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div className="top_content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <figure>
                <img src={PeopleImage} alt="" />
              </figure>
            </div>
            <div className="col-md-6 ">
              <h2>People</h2>
              <p>
                <strong>Remil Michael</strong>, CTO and product implementation
                head. He has done his Bachelors in Engineering in India and is
                pursuing a Web Development program at Conestoga College,
                Waterloo, Canada.
              </p>
              <p>
                <strong>Varsha Vimal Kumar</strong>, CQO and Designer. Completed
                her Master's in Computer Application in India and now pursuing
                Web Development program at Conestoga College, Waterloo, Canada.
              </p>
              <p>
                <strong>Tyler Sayer</strong>, COO. He is pursuing Web
                Development program at Conestoga College, Waterloo, Canada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutContent;
