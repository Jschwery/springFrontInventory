import React, { useEffect, useReducer, useState } from "react";
import registration from "../images/register.svg";
import CardContainer from "../components/CardContainer";
import { Action, State, createRowReducer } from "./Login";
import logo from "../images/banner_logo.png";
import { userInfo } from "os";

function Registration() {
  const [applyImageSize, setApplyImageSize] = useState(false);

  useEffect(() => {
    console.log("apply image size: " + applyImageSize);
  }, [applyImageSize]);

  useEffect(() => {
    const handleResize = () => {
      setApplyImageSize(window.innerWidth <= 534);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [stateRegister, setStateRegister] = useState<State>({
    Email: { value: "", errorMessage: "Not a valid email", isValid: false },
    Name: { value: "", errorMessage: "Not a valid name", isValid: false },
    Password: {
      value: "",
      errorMessage: "Password is too short",
      isValid: false,
    },
  });

  function validateInput(rowTitle: string, value: string): boolean {
    switch (rowTitle.toLowerCase()) {
      case "email":
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegEx.test(value);
      case "password":
        return value.length >= 6;
      case "name":
        return value.length >= 1 && value.length >= 20;
      default:
        return true;
    }
  }

  const handleInputChange = (rowTitle: string, value: string) => {
    const errorMessage = validateInput(rowTitle, value) ? "" : "Invalid input";
  };

  return (
    <div className="bg-slate-700 min-h-screen flex flex-col sm:flex-row justify-center items-center">
      <div
        className="hidden sm:flex sm:h-screen order-2 sm:order-1 h-screen w-full sm:w-2/3"
        style={{
          backgroundImage: `url(${registration})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        className="p-3 sm:hidden "
        style={{
          background: `url(${logo})`,
          backgroundSize: applyImageSize ? "contain" : "cover",
          height: "240px",
          width: "90%",
          marginTop: "10px",
          marginBottom: "10px",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="w-[90%] pb-6 h-full sm:pb-0 sm:w-full mx-2 sm:mx-0 sm:h-screen flex items-start">
        <CardContainer
          numberOfRows={3}
          rowTitles={["Name", "Email", "Password"]}
          submitButtonText="Submit"
          containerTitle="Register"
          inputValues={stateRegister}
          additionalText={["Already have an account?", "Log in"]}
          setLink="/login"
          handleInputChange={handleInputChange}
          handleSubmit={() => {}}
        />
      </div>
    </div>
  );
}

export default Registration;
