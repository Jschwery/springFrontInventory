import { Action, State } from "../../types";

export function calendar(state: State, action: Action): State {
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
    case "close_dateTimes":
      return { ...state, closeDatesTimes: action.payload };
    default:
      throw new Error("Could not find action");
  }
}
