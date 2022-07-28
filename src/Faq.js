import React from "react";
import FaqContent from "./components/FaqContent/FaqContent";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import Navbar from "./components/Navbar/Navbar";

function Faq() {
  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFF";

    return () => {
      document.body.style.backgroundColor = "#EAF3FA";
    };
  }, []);

  return (
    <>
      <Navbar />
      <FaqContent />
      <HomeFooter />
    </>
  );
}

export default Faq;
