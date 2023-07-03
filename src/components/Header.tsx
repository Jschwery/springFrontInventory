import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { DiffieHellmanGroup } from "crypto";

function Header() {
  return (
    <div className="bg-slate-700 h-[60px]">
      <div
        style={{
          backgroundImage: `url(${logo})`,
          width: "100px",
          height: "100px",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default Header;
