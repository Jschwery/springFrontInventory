import { TextField } from "@mui/material";
import { format, addDays } from "date-fns";
import "./calStyles.css";
import { Box, Typography, useTheme, Button, Modal } from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import { useState } from "react";
import DigitalClock from "../../components/DigitalClock";
import dayjs from "dayjs";
import { CalendarContext } from "../../global/calendar/CalendarContext";

export default function WeekDayModal({
  open,
  handleClose,
  functionCallback,
  selectedDate,
}) {
  const [eventName, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [submittedError, setSubmittedError] = useState("");
  const [isValidDateOrder, setIsValidDateOrder] = useState(true);
  const { state, dispatch } = React.useContext(CalendarContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    position: "absolute",
    top: "40%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: `${colors.primary[900]}`,
    border: `2px solid ${colors.primary[100]}`,
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const formatDateWithSuffix = (date) => {
    const dayOfMonth = parseInt(format(date, "d"), 10);
    let suffix = "th";
    if (dayOfMonth < 11 || dayOfMonth > 13) {
      switch (dayOfMonth % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
      }
    }
    return format(date, `EEEE, MMMM d'${suffix}'`);
  };

  React.useEffect(() => {
    if (selectedDate.startStr && selectedDate.endStr) {
      setStartDate(format(new Date(selectedDate.startStr), "yyyy-MM-dd"));
      setEndDate(format(new Date(selectedDate.endStr), "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  const handleFormSubmit = () => {
    console.log("submitted");

    if (eventName !== "" && startDate && endDate) {
      let startStr = startDate.format();
      let endStr = new Date(endDate).toISOString();

      functionCallback(eventName, startStr, endStr, false);
      setName("");
      handleClose();
    } else {
      setSubmittedError(true);
    }
  };

  const handleShowStartDate = () => {
    dispatch({ type: "set_selectedEvent", payload: true });
    setShowStartTime(!showStartTime);
    setShowEndTime(false);
  };

  const checkDateOrder = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start.getTime() < end.getTime()) {
        setIsValidDateOrder(true);
      } else {
        setIsValidDateOrder(false);
      }
    }
  };

  React.useEffect(() => {
    checkDateOrder();
  }, [startDate, endDate]);

  const handleShowEndDate = () => {
    dispatch({ type: "set_selectedEvent", payload: true });
    setShowEndTime(!showEndTime);
    setShowStartTime(false);
  };

  format(addDays(new Date(), 1), "yyyy-MM-dd");

  const handleEventName = (event) => {
    setSubmittedError(false);
    setName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event);
  };

  let initialValues = {
    startDate: selectedDate.startStr ? dayjs(selectedDate.startStr) : null,
    endDate: selectedDate.endStr ? dayjs(selectedDate.endStr) : null,
  };
  /*
  set the time in the event title
  set the error text in correct spot

  dont let submit if the red text is showing

  fix coloring

  */

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {submittedError && (
            <Typography
              sx={{
                color: colors.redAcc[500],
                py: "10px",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              Please fill in an event name
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
            </Typography>
          )}
          <Box m="20px">
            <Typography
              sx={{ color: colors.primary[100], pb: "15px" }}
              variant="h3"
              component="h3"
            >
              {startDate ? formatDateWithSuffix(new Date(startDate)) : ""}
            </Typography>

            <Box
              sx={{
                py: "10px",
                "& .MuiFormLabel-root": {
                  fontWeight: "bold",
                  color:
                    eventName === ""
                      ? `${colors.primary[100]}`
                      : `${colors.greenAcc[400]}`,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      eventName === ""
                        ? `${colors.primary[100]}`
                        : `${colors.greenAcc[400]}`,
                  },
                  "&:hover fieldset": {
                    borderColor:
                      eventName === ""
                        ? `${colors.primary[100]}`
                        : `${colors.greenAcc[400]}`,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      eventName === ""
                        ? `${colors.primary[100]}`
                        : `${colors.greenAcc[400]}`,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color:
                    eventName === ""
                      ? `${colors.primary[100]}`
                      : `${colors.greenAcc[400]}`,
                },
              }}
            >
              <TextField
                required
                label="Required"
                variant="outlined"
                placeholder="event name"
                onChange={handleEventName}
              />
              <Box>
                <Box
                  className=" hover:cursor-pointer hover:opacity-75"
                  display="inline-flex"
                  sx={{ py: "15px" }}
                  alignItems="center"
                  justifyContent="flex-start"
                  onClick={handleShowStartDate}
                >
                  <Typography className="pr-2" variant="h3">
                    Start Time
                  </Typography>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Typography
                    className={`pl-3 ${
                      !isValidDateOrder ? "text-red-500" : ""
                    }`}
                    variant="h4"
                  >
                    {startDate ? format(new Date(startDate), "hh:mm a") : ""}
                  </Typography>
                </Box>
              </Box>

              <Box className={`fade ${showStartTime ? "show" : ""}`}>
                <DigitalClock
                  getDateTime={handleStartDateChange}
                  defaultDate={initialValues.startDate}
                />
              </Box>

              <Box
                className=" hover:cursor-pointer hover:opacity-75"
                display="inline-flex"
                sx={{ py: "15px" }}
                alignItems="center"
                justifyContent="flex-start"
                onClick={handleShowEndDate}
              >
                <Typography className="pr-2" variant="h3">
                  End Time
                </Typography>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <Typography
                  className={`pl-3 ${!isValidDateOrder ? "text-red-500" : ""}`}
                  variant="h4"
                >
                  {endDate ? format(new Date(endDate), "hh:mm a") : ""}
                </Typography>
              </Box>

              <Box className={`py-3 fade ${showEndTime ? "show" : ""}`}>
                <DigitalClock
                  getDateTime={handleEndDateChange}
                  defaultDate={initialValues.endDate}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pt: "10px",
              }}
            >
              <Button
                onClick={handleFormSubmit}
                sx={{
                  bgcolor: `${colors.primary[100]}`,
                  ":hover": { bgcolor: `${colors.primary[300]}` },
                  color: `${colors.primary[900]}`,
                  fontWeight: "bold",
                }}
                variant="contained"
                type="submit"
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
