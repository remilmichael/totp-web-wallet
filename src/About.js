import React from "react";
import BreadCrumb from "./components/BreadCrumb/BreadCrumb";
import AboutContent from "./components/AboutComponents/AboutContent";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import Navbar from "./components/Navbar/Navbar";

function AboutUs() {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFF";

    return () => {
      document.body.style.backgroundColor = "#EAF3FA";
    };
  }, []);

  return (
    <>
      <Navbar />
      <BreadCrumb name="About Us" />
      <AboutContent />
      <HomeFooter />
    </>
  );
}

export default AboutUs;
