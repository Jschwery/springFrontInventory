import { useReducer, useState } from "react";
import CardContainer, { FieldState } from "../../components/CardContainer";
import { userSubmit } from "../../util/userSubmit";

export interface State {
  [key: string]: FieldState;
}

export interface Action {
  type: "INPUT_CHANGE" | "SUBMIT";
  payload?: {
    rowTitle: string;
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
}

export function createRowReducer(
  validateInput: (rowTitle: string, value: string) => boolean
) {
  return function rowReducer(state: State, action: Action): State {
    switch (action.type) {
      case "INPUT_CHANGE":
        const isValid = validateInput(
          action.payload?.rowTitle ?? "",
          action.payload?.value ?? ""
        );
        return {
          ...state,
          [action.payload?.rowTitle ?? ""]: {
            value: action.payload?.value ?? "",
            isValid,
            errorMessage: isValid ? "" : action.payload?.errorMessage ?? "",
          },
        };
      case "SUBMIT":
        const isFormValid = Object.values(state).every(
          (field) => field.isValid
        );
        if (isFormValid) {
          userSubmit({
            urlEndpoint: "login",
            requestType: "POST",
            body: {
              userName: state["Email"].value,
              password: state["Password"].value,
            },
          });
        } else {
          console.log("Form is not valid");
        }
        return state;
      default:
        return state;
    }
  };
}

function validateInput(rowTitle: string, value: string): boolean {
  switch (rowTitle.toLowerCase()) {
    case "email":
      const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegEx.test(value);
    case "password":
      return value.length >= 6;
    default:
      return true;
  }
}

function Login() {
  const [stateLogin, setStateLogin] = useState<State>({
    Email: { value: "", errorMessage: "Not a valid email", isValid: false },
    Password: {
      value: "",
      errorMessage: "Password is too short",
      isValid: false,
    },
  });

  const [state, dispatch] = useReducer(
    createRowReducer(validateInput),
    stateLogin
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
    <div className="w-[90%] md:w-3/5 max-w-[600px] flex bg-slate-600">
      <CardContainer
        numberOfRows={2}
        rowTitles={["Email", "Password"]}
        submitButtonText="Sign in"
        containerTitle="Login"
        additionalText={["Dont have an account?", "Sign up"]}
        setLink="/register"
        inputValues={stateLogin}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Login;
