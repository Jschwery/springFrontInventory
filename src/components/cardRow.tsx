import React, { useEffect, useState } from "react";
import InputElement from "./inputElement";

interface CardRowProps {
  rowTitle: string;
  onInputChange: (rowTitle: string, value: string, isValid: boolean) => void;
  isValid: boolean;
  errorMessage: string;
}

function CardRow({
  rowTitle,
  onInputChange,
  isValid,
  errorMessage,
}: CardRowProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onInputChange(rowTitle, value, isValid);
  };

  return (
    <div className="flex flex-col w-4/6">
      <h3 className="pb-2 text-xl">
        {rowTitle}{" "}
        {!isValid && (
          <>
            <div className="flex items-center">
              <span className="text-red-500">{errorMessage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-1 mt-0.5 text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          </>
        )}
      </h3>
      <InputElement
        name={rowTitle}
        onInputChange={handleInputChange}
        isValid={isValid}
      />
    </div>
  );
}

export default CardRow;
