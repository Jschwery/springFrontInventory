import React, { useEffect, useReducer } from "react";
import { useEventContext } from "../global/EventProvider";

interface State {
  currentEvents: any[];
  modalOpen: boolean;
  selectedDate: [string | null, string | null];
  selected: any[];
  weekDayModal: boolean;
  deleteModalOpen: boolean;
  selectedEvent: any | null;
}

type Action =
  | { type: "set_currentEvents"; payload: any[] }
  | { type: "toggle_modal"; payload: boolean }
  | { type: "set_selectedDate"; payload: [string | null, string | null] }
  | { type: "set_selected"; payload: any[] }
  | { type: "toggle_weekDayModal"; payload: boolean }
  | { type: "toggle_deleteModal"; payload: boolean }
  | { type: "set_selectedEvent"; payload: any | null };

const initialState: State = {
  currentEvents: [],
  modalOpen: false,
  selectedDate: [null, null],
  selected: [],
  weekDayModal: false,
  deleteModalOpen: false,
  selectedEvent: null,
};

function calendar(state: State, action: Action): State {
  switch (action.type) {
    case "set_currentEvents":
      return { ...state, currentEvents: action.payload };
    case "toggle_modal":
      return { ...state, modalOpen: action.payload };
    case "set_selectedDate":
      return { ...state, selectedDate: action.payload };
    case "set_selected":
      return { ...state, selected: action.payload };
    case "toggle_weekDayModal":
      return { ...state, weekDayModal: action.payload };
    case "toggle_deleteModal":
      return { ...state, deleteModalOpen: action.payload };
    case "set_selectedEvent":
      return { ...state, selectedEvent: action.payload };
    default:
      throw new Error("Could not find action");
  }
}

export const useCalendar = () => {
  const [state, dispatch] = useReducer(calendar, initialState);

  return [state, dispatch];
};
