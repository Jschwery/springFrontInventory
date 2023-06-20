import React from "react";
import Header from "../components/Header";

function Home() {
  return (
    <div>
      <Header
        linkTitles={["About Us", "What We Do", "Pricing", "Support"]}
        button
      />
    </div>
  );
}

export default Home;
