import { State } from "../../types";

export const initialState: State = {
  currentEvents: [],
  modalOpen: false,
  selectedDate: [null, null],
  selected: [],
  weekDayModal: false,
  deleteModalOpen: false,
  selectedEvent: null,
  closeDatesTimes: false,
};
