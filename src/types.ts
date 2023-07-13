export interface State {
  currentEvents: any[];
  modalOpen: boolean;
  selectedDate: [string | null, string | null];
  selected: any[];
  weekDayModal: boolean;
  deleteModalOpen: boolean;
  selectedEvent: any | null;
  closeDatesTimes: boolean;
}

export type Action =
  | { type: "set_currentEvents"; payload: any[] }
  | { type: "toggle_modal"; payload: boolean }
  | { type: "set_selectedDate"; payload: [string | null, string | null] }
  | { type: "set_selected"; payload: any[] }
  | { type: "toggle_weekDayModal"; payload: boolean }
  | { type: "toggle_deleteModal"; payload: boolean }
  | { type: "set_selectedEvent"; payload: any | null }
  | { type: "close_dateTimes"; payload: boolean };
