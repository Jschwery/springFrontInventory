import { useNavigate } from "react-router-dom";
import CardRow from "./CardRow";
import { State } from "../pages/login/login";

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
  inputValues: State;
  handleInputChange: (rowTitle: string, value: string) => void;
  handleSubmit: () => void;
}

function CardContainer({
  numberOfRows,
  rowTitles,
  submitButtonText,
  containerTitle,
  additionalText,
  setLink,
  inputValues,
  handleInputChange,
  handleSubmit,
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

  return (
    <>
      <div className="w-full h-full items-center bg-slate-50 flex flex-col p-10 py-20 space-y-8 rounded-md">
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
