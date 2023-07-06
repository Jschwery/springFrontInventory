import { useState, useRef } from "react";
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
import { useEffect } from "react";
import * as React from "react";
import BasicModal from "./modal";

const Cal = () => {
  const calendarRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState([null, null] || [null]);
  const [event, setEvent] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log("evnet?");
    console.log(event);
  }, [event]);

  const modalCallback = (title, startStr, endStr, allDay) => {
    if (calendarRef.current) {
      let calendarApi = calendarRef.current.getApi();

      calendarApi.addEvent({
        id: `${startStr}-${title}`,
        title: title,
        start: startStr,
        end: endStr,
        allDay: allDay,
      });
    } else {
      console.error("Calendar API not available");
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  const handleDateClick = (selected) => {
    setEvent(selected.view.calendar);
    setSelected(selected);
    let endDate = new Date(selected.endStr);
    endDate.setDate(endDate.getDate() - 1);
    let correctedEndStr = endDate.toISOString().split("T")[0];
    if (selected.startStr === correctedEndStr) {
      setSelectedDate([selected.startStr]);
    } else {
      setSelectedDate([selected.startStr, correctedEndStr]);
    }
    setModalOpen(true);
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>

          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAcc[600],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <BasicModal
                  selected={event}
                  headerText={"Set Event"}
                  subText={"set the text fo this evenetttt"}
                  open={modalOpen}
                  allDayEvent={selected}
                  functionCallback={modalCallback}
                  handleClose={() => {
                    setModalOpen(false);
                    setSelectedDate([null, null]);
                  }}
                  selectedDate={selectedDate}
                />

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
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Cal;
