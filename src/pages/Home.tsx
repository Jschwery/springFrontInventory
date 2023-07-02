import React from "react";
import Header from "../components/Header";
import Body from "../components/home/body";
import Footer from "../components/home/footer";

function Home() {
  return (
    <div>
      <Header
        linkTitles={["About Us", "What We Do", "Pricing", "Support"]}
        button
      />
      <Body />
      <Footer />
    </div>
  );
}

export default Home;
