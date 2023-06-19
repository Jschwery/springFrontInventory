import React, { useContext, useState } from "react";
import { InputValuesContext } from "./inputContext";

interface InputElementProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  name: string;
}

function InputElement({ onInputChange, isValid }: InputElementProps) {
  const inputClassName = isValid
    ? "w-full rounded-sm shadow-sm shadow-black p-2"
    : "w-full rounded-sm shadow-sm shadow-black p-2 border border-red-500";
  return (
    <input className={inputClassName} onChange={onInputChange} type="text" />
  );
}

export default InputElement;
