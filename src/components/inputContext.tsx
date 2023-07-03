import React from "react";
import { FieldState } from "./CardContainer";

export const InputValuesContext = React.createContext<{
  [key: string]: FieldState;
}>({});
