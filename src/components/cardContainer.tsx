import { useState } from "react";
import CardRow from "./cardRow";

export interface FieldState {
  value: string;
  errorMessage: string;
  isValid: boolean;
}

function CardContainer() {
  const [inputValues, setInputValues] = useState<{ [key: string]: FieldState }>(
    {
      Name: { value: "", isValid: true, errorMessage: "" },
      Email: { value: "", isValid: true, errorMessage: "" },
      Password: { value: "", isValid: true, errorMessage: "" },
      "Re-enter Password": { value: "", isValid: true, errorMessage: "" },
    }
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
    setInputValues((prev) => ({
      ...prev,
      [rowTitle]: { ...prev[rowTitle], value },
    }));

    validateInput(rowTitle, value);
  };

  const handleSubmit = () => {
    for (const key of Object.keys(inputValues)) {
      validateInput(key, inputValues[key].value);
    }
  };

  return (
    <>
      <div className="w-full h-full items-center bg-slate-50 flex flex-col p-10 py-20 space-y-8">
        <h2 className=" text-5xl font-Inter">Create Your Account</h2>
        <CardRow
          rowTitle="Name"
          isValid={inputValues.Name.isValid}
          errorMessage={inputValues.Name.errorMessage}
          onInputChange={handleInputChange}
        />
        <CardRow
          rowTitle="Email"
          isValid={inputValues.Email.isValid}
          errorMessage={inputValues.Email.errorMessage}
          onInputChange={handleInputChange}
        />
        <CardRow
          rowTitle="Password"
          isValid={inputValues.Password.isValid}
          errorMessage={inputValues.Password.errorMessage}
          onInputChange={handleInputChange}
        />
        <CardRow
          rowTitle="Re-enter Password"
          isValid={inputValues["Re-enter Password"].isValid}
          errorMessage={inputValues["Re-enter Password"].errorMessage}
          onInputChange={handleInputChange}
        />
        <button
          className="bg-orange-600 hover:bg-orange-400 text-white w-4/6 py-4 !mt-12 px-9 rounded font-bold"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <h2>
          Already have an account?{" "}
          <span onClick={() => {}} className="text-blue-600 cursor-pointer">
            Login
          </span>
        </h2>
      </div>
    </>
  );
}
export default CardContainer;
