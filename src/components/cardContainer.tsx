import { useState } from "react";
import CardRow from "./cardRow";
import { useNavigate } from "react-router-dom";

export interface FieldState {
  value: string;
  errorMessage: string;
  isValid: boolean;
}

export interface CardContainerProps {
  numberOfRows: number;
  rowTitles: string[];
  submitButtonText: string;
  containerTitle: string;
  additionalText?: [text: string, textHyper?: string];
  setLink?: string;
}

function CardContainer({
  numberOfRows,
  rowTitles,
  submitButtonText,
  containerTitle,
  additionalText,
  setLink,
}: CardContainerProps) {
  if (numberOfRows !== rowTitles.length) {
    throw new Error(
      "Number of rows does not match the number of titles provided"
    );
  }

  const navigate = useNavigate();

  const handleSignInClick = () => {
    if (setLink) {
      navigate(setLink);
    } else {
      throw new Error("Invalid link provided");
    }
  };

  const defaultInputValues = rowTitles.reduce((acc, title) => {
    acc[title] = { value: "", isValid: true, errorMessage: "" };
    return acc;
  }, {} as { [key: string]: FieldState });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: FieldState }>(
    defaultInputValues
  );

  const validateInput = (rowTitle: string, value: string) => {
    let isValid = true;
    let errorMessage = "";

    switch (rowTitle.toLowerCase()) {
      case "name":
        if (value.length > 20) {
          isValid = false;
          errorMessage = "Name cannot exceed 20 characters";
        } else if (value.length === 0) {
          isValid = false;
          errorMessage = "Please enter a name";
        }
        break;
      case "email":
        const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (value.length === 0) {
          isValid = false;
          errorMessage = "Please enter email address";
        } else if (!emailRegexp.test(value)) {
          isValid = false;
          errorMessage = "Invalid email format";
        }
        break;
      case "password":
        if (value.length === 0) {
          isValid = false;
          errorMessage = "Please enter a password";
        }
        break;
      case "re-enter password":
        if (value.length === 0) {
          isValid = false;
          errorMessage = "Please enter a password";
        }
        if (value !== inputValues.Password.value) {
          isValid = false;
          errorMessage = "Password does not match!";
        }
        break;
      default:
        break;
    }

    setInputValues((prev) => ({
      ...prev,
      [rowTitle]: { value, isValid, errorMessage },
    }));
  };

  const handleInputChange = (rowTitle: string, value: string) => {
    if (isSubmitted) {
      validateInput(rowTitle, value);
    }

    setInputValues((prev) => ({
      ...prev,
      [rowTitle]: { ...prev[rowTitle], value },
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    for (const key of Object.keys(inputValues)) {
      validateInput(key, inputValues[key].value);
    }
  };

  return (
    <>
      <div className="w-full h-full items-center bg-slate-50 flex flex-col p-10 py-20 space-y-8">
        <h2 className="text-5xl font-Inter">{containerTitle}</h2>
        {rowTitles.map((title) => (
          <CardRow
            key={title}
            rowTitle={title}
            isValid={inputValues[title].isValid}
            errorMessage={inputValues[title].errorMessage}
            onInputChange={handleInputChange}
          />
        ))}
        <button
          className="bg-orange-600 hover:bg-orange-400 text-white w-4/6 py-4 !mt-12 px-9 rounded font-bold"
          onClick={handleSubmit}
        >
          {submitButtonText}
        </button>
        <h2>
          {additionalText?.[0]}{" "}
          {additionalText?.[1] && (
            <span
              onClick={() => handleSignInClick()}
              className="text-blue-600 cursor-pointer"
            >
              {additionalText?.[1]}
            </span>
          )}
        </h2>
      </div>
    </>
  );
}

export default CardContainer;
