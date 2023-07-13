import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core";
import "./calStyles.css";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import * as React from "react";
import BasicModal from "./modal";
import DeleteModal from "./DeleteModal";
import WeekDayModal from "./WeekDayModal";
import { CalendarContext } from "../../global/calendar/CalendarContext";

const Cal = () => {
  const calendarRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { state, dispatch } = React.useContext(CalendarContext);
  useEffect(() => {
    console.log("the state is");
    console.log(state);
  }, [state]);

  const modalCallback = (title, startStr, endStr, allDay) => {
    let newEvent = {
      id: `${startStr}-${title}`,
      title: title,
      start: startStr,
      end: endStr,
      allDay: allDay,
    };

    dispatch({
      type: "set_currentEvents",
      payload: [...state.currentEvents, newEvent],
    });
  };

  const handleEventClick = (selectedEvent) => {
    dispatch({ type: "set_selectedEvent", payload: selectedEvent });

    let newCurrentEvents = state.currentEvents.filter(
      (event) => event.id !== selectedEvent.id
    );
    dispatch({
      type: "set_currentEvents",
      payload: newCurrentEvents,
    });
  };

  const handleDeleteModalClick = (info) => {
    let newCurrentEvents = state.currentEvents.filter(
      (event) => event.id !== info.event.id
    );

    dispatch({ type: "set_currentEvents", payload: newCurrentEvents });
    dispatch({ type: "set_selectedEvent", payload: info.event });
    dispatch({ type: "toggle_deleteModal", payload: true });
  };

  const handleDateClick = (selected) => {
    dispatch({ type: "set_selected", payload: selected });

    const calendarApi = calendarRef.current.getApi();
    const currentView = calendarApi.view.type;

    if (currentView === "dayGridMonth") {
      dispatch({ type: "toggle_modal", payload: true });
    } else {
      dispatch({ type: "toggle_weekDayModal", payload: true });
    }
  };

  const handleEventDropOrResize = (info) => {
    let updatedEvents = state.currentEvents.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.start.toISOString(),
          end: info.event.end
            ? info.event.end.toISOString()
            : info.event.start.toISOString(),
        };
      } else {
        return event;
      }
    });

    dispatch({
      type: "set_currentEvents",
      payload: updatedEvents,
    });
  };

  useEffect(() => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();
      calendarApi.getEvents().forEach((event) => event.remove());

      state.currentEvents.forEach((event) => {
        calendarApi.addEvent(event);
      });
    }
  }, [calendarRef, state.currentEvents]);

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="5px"
          style={{ overflowY: "auto", maxHeight: "75vh" }}
        >
          <Typography variant="h5">Events</Typography>
          <BasicModal
            headerText={"Set Event"}
            open={state.modalOpen}
            functionCallback={modalCallback}
            handleClose={() => {
              dispatch({ type: "toggle_modal", payload: false });
              dispatch({
                type: "set_selectedDate",
                payload: [null, null],
              });
            }}
            selectedDate={state.selected}
          />
          <DeleteModal
            headerText={"Delete Event"}
            subText={`Are you sure you want to delete event `}
            open={state.deleteModalOpen}
            selectedEvent={state.selectedEvent}
            deleteEventCallback={handleEventClick}
            handleClose={() => {
              dispatch({ type: "toggle_deleteModal", payload: false });
            }}
          />
          <WeekDayModal
            headerText={"Set Event"}
            open={state.weekDayModal}
            functionCallback={modalCallback}
            handleClose={() => {
              dispatch({ type: "toggle_weekDayModal", payload: false });
              dispatch({
                type: "set_selectedDate",
                payload: [null, null],
              });
              dispatch({
                type: "close_dateTimes",
                payload: false,
              });
            }}
            selectedDate={state.selected}
          />
          <List>
            {state.currentEvents
              .filter(
                (event, index, self) =>
                  index === self.findIndex((e) => e.id === event.id)
              )
              .map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAcc[600],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Box>
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            ref={calendarRef}
            eventColor={`${colors.greenAcc[500]}`}
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleDeleteModalClick}
            eventDrop={handleEventDropOrResize}
            eventResize={handleEventDropOrResize}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Cal;
