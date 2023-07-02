import React, { useReducer, useState } from "react";
import registration from "../images/register.svg";
import CardContainer from "../components/cardContainer";
import { Action, State, createRowReducer } from "./Login";

function Registration() {
  const [stateRegister, setStateRegister] = useState<State>({
    Email: { value: "", errorMessage: "Not a valid email", isValid: false },
    Name: { value: "", errorMessage: "Not a valid name", isValid: false },
    Password: {
      value: "",
      errorMessage: "Password is too short",
      isValid: false,
    },
  });
  const [state, dispatch] = useReducer(
    createRowReducer(validateInput),
    stateRegister
  );

  const handleSubmit = () => {
    dispatch({ type: "SUBMIT" });
  };
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
    dispatch({
      type: "INPUT_CHANGE",
      payload: {
        rowTitle,
        value,
        isValid: validateInput(rowTitle, value),
        errorMessage,
      },
    });
  };

  return (
    <div className="bg-slate-700 min-h-screen flex justify-center items-center">
      <div
        className="flex h-screen flex-1"
        style={{
          backgroundImage: `url(${registration})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <div className="w-7/12 h-screen flex items-start">
        <CardContainer
          numberOfRows={3}
          rowTitles={["Name", "Email", "Password"]}
          submitButtonText="Submit"
          containerTitle="Register"
          inputValues={stateRegister}
          additionalText={["Already have an account?", "Log in"]}
          setLink="/login"
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Registration;
