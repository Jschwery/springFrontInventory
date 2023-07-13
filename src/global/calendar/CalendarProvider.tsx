import React, { ReactNode, useReducer } from "react";
import { CalendarContext } from "./CalendarContext";
import { calendar } from "./calendarReducer";
import { initialState } from "./initialState";

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(calendar, initialState);

  return (
    <CalendarContext.Provider value={{ state, dispatch }}>
      {children}
    </CalendarContext.Provider>
  );
};
