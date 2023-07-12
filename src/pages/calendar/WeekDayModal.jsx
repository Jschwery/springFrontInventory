import { TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import styles from "./calStyles.css";
import { Box, Typography, useTheme, Button, Modal } from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import DigitalClock from "../../components/DigitalClock";
import { useCalendar } from "../../hooks/useCalendar";
import dayjs from "dayjs";
import Header from "../../components/Header";

//need to set the start date time to the time

export default function WeekDayModal({
  headerText,
  open,
  handleClose,
  functionCallback,
  selectedDate,
}) {
  const [eventName, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [submittedError, setSubmittedError] = useState("");
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [isValidDateOrder, setIsValidDateOrder] = useState(true);
  const [state, dispatch] = useCalendar();

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

  const handleFormSubmit = (values) => {
    console.log("handleFormSubmit called");
    if (eventName !== "") {
      functionCallback(
        eventName,
        `${values.startDate}T${values.startTime}`,
        `${values.endDate}T${values.endTime}`,
        false
      );
      setName("");
      setShowStartTime(false);
      setShowEndTime(false);
      handleClose();
    } else {
      setSubmittedError(true);
    }
  };

  const handleModalClose = () => {
    console.log("handleModalClose called");
    setShowStartTime(false);
    setShowEndTime(false);
    handleClose();
  };

  const handleEventName = (event) => {
    setSubmittedError(false);
    setName(event.target.value);
  };
  const getStartDateTime = (date) => {
    setStartDate(date);
  };

  const getEndDateTime = (date) => {
    setEndDate(date);
  };
  const handleShowStartDate = () => {
    dispatch({ type: "set_selectedEvent", payload: true });
    setShowStartTime(!showStartTime);
    setShowEndTime(false);
  };

  const handleShowEndDate = () => {
    dispatch({ type: "set_selectedEvent", payload: true });
    setShowEndTime(!showEndTime);
    setShowStartTime(false);
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
    console.log("selectedDate inside useEffect:", selectedDate);
    if (selectedDate.startStr && selectedDate.endStr) {
      let dateStr = dayjs(selectedDate.startStr);
      let dateEnd = dayjs(selectedDate.endStr);

      console.log("About to set start and end date with:", [
        dateStr.format(),
        dateEnd.format(),
      ]);

      setStartDate(dateStr);
      setEndDate(dateEnd);
    }
  }, [selectedDate]);

  React.useEffect(() => {
    console.log("selectedDate inside useEffect:", selectedDate);
    if (selectedDate.startStr) {
      let dateStr = dayjs(selectedDate.startStr);

      console.log("About to set start date with:", dateStr.format());

      setStartDate(dateStr);
    }
  }, [selectedDate]);

  React.useEffect(() => {
    console.log("selectedDate inside useEffect:", selectedDate);
    if (selectedDate.endStr) {
      let dateEnd = dayjs(selectedDate.endStr);

      console.log("About to set end date with:", dateEnd.format());

      setEndDate(dateEnd);
    }
  }, [selectedDate]);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: colors.primary[100] }}
            variant="h2"
            component="h2"
          >
            {dayjs(startDate).format("MM/DD/YYYY HH:mm:ss")}
          </Typography>
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
                  ></Typography>
                </Box>
              </Box>

              <Box className={`fade ${showStartTime ? "show" : ""}`}>
                <DigitalClock getDateTime={getStartDateTime} />
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
                ></Typography>
              </Box>

              <Box className={`py-3 fade ${showEndTime ? "show" : ""}`}>
                <DigitalClock getDateTime={getEndDateTime} />
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
