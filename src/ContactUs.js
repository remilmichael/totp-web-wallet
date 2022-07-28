import React from "react";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import ContactContent from "./components/ContactContent/ContactContent";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import Navbar from "./components/Navbar/Navbar";

function ContactUs() {

  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFF";

    return () => {
      document.body.style.backgroundColor = "#EAF3FA";
    };
  }, []);

  return (
    <>
      <Navbar />
      <BreadCrumb name="Contact Us" desc="Contact Us" />
      <ContactContent />
      <HomeFooter />
    </>
  );
}

export default ContactUs;
