import React from "react";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import ContactContent from "./components/ContactContent/ContactContent";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import Navbar from "./components/Navbar/Navbar";
import { instance } from "./constants";

function ContactUs() {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFF";

    return () => {
      document.body.style.backgroundColor = "#EAF3FA";
      setOutput(null);
    };
  }, []);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [spinner, setSpinner] = React.useState(false);

  const resetStates = () => {
    setName("")
    setEmail("");
    setSubject("");
    setMessage("");
  }

  const formSubmitHandler = () => {
    setSpinner(true);
    if (name && email && subject && message) {
      const body = {
        name: name, 
        email: email,
        subject: subject,
        message: message
      }
      instance.post('/ticket/add', body)
        .then(resp => {
          setOutput("Message has been submitted. We will respond to you soon.");
          setSpinner(false);
          resetStates();
        })
        .catch(err => {
          resetStates();
          if (err.response && err.response.data &&  err.response.data.message) {
            setOutput(err.response.data.message);
          } else {
            setOutput("Something went wrong");
          }
          setSpinner(false);
        })
    } else {
      setOutput("All fields are required!!!")
    }
  };

  return (
    <>
      <Navbar />
      <BreadCrumb name="Contact Us" desc="Contact Us" />
      <ContactContent
        nameHandler={setName}
        emailHandler={setEmail}
        subjectHandler={setSubject}
        messageHandler={setMessage}
        formSubmitHandler={formSubmitHandler}
        output={output}
        spinnerState={spinner}
      />
      <HomeFooter />
    </>
  );
}

export default ContactUs;
