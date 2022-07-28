import React from "react";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import HomeContent from "./components/HomeContent/HomeContent";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import Navbar from "./components/Navbar/Navbar";

function Home() {

  React.useEffect(() => {

    document.body.style.backgroundColor = '#FFF';

    return (() => {
      document.body.style.backgroundColor = '#EAF3FA';
    })

  },  [])

  return (
    <>
      <Navbar />
      <HomeBanner />
      <HomeContent />
      <HomeFooter />
    </>
  );
}

export default Home;
