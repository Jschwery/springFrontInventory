import React, { createContext } from "react";
import { State, Action } from "../../types";
import { initialState } from "./initialState";

export const CalendarContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });
