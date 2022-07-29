import ContactImage from "../../assets/contact.svg";
import SmallSpinner from '../SmallSpinner/SmallSpinner';

function ContactContent(props) {
  const {
    nameHandler,
    emailHandler,
    subjectHandler,
    messageHandler,
    formSubmitHandler,
    output,
    spinnerState,
  } = props;

  const form = spinnerState ? <SmallSpinner /> : (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Your Name"
        onChange={(e) => nameHandler(e.target.value)}
      />
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => emailHandler(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Subject"
        onChange={(e) => subjectHandler(e.target.value)}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="6"
        placeholder="Your Message"
        className="form-control mb-3"
        onChange={(e) => messageHandler(e.target.value)}
      ></textarea>
      <div className="cf"></div>
      <input
        type="button"
        value="Send"
        className="btn btn_theme"
        onClick={() => formSubmitHandler()}
      />
      {output ? <div className="message_display">{output}</div> : null}
    </>
  );

  return (
    <div className="top_content">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <h2>Let's talk about everything!</h2>
            <figure>
              <img src={ContactImage} alt="contact" />
            </figure>
          </div>
          <div className="col-md-6">
            {form}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactContent;
