import React from "react";
import { FieldState } from "./cardContainer";

export const InputValuesContext = React.createContext<{
  [key: string]: FieldState;
}>({});
