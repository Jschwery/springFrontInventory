import React from "react";
import Header from "../components/Header";
import Login from "./Login";
import logo from "../images/banner_logo.png";

function Home() {
  return (
    <div className="flex space-y-2 h-screen w-full flex-col bg-slate-600 items-center justify-start">
      <div
        style={{
          background: `url(${logo})`,
          backgroundSize: "cover",
          height: "250px",
          width: "475px",
          minWidth: "450px",
        }}
      ></div>
      <Login />
    </div>
  );
}

export default Home;
