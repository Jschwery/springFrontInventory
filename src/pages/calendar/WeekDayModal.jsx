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
  const [startAndEndDate, setStartAndEndDate] = useState([null, null]);
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

  React.useEffect(() => {
    if (selectedDate.startStr && selectedDate.endStr) {
      let dateStr = dayjs(selectedDate.startStr);
      let dateEnd = dayjs(selectedDate.endStr);
      setStartAndEndDate([dateStr, dateEnd]);
    }
  }, [selectedDate]);

  const handleFormSubmit = (values) => {
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
      setStartAndEndDate([null, null]);
      handleClose();
    } else {
      setSubmittedError(true);
    }
  };

  const handleModalClose = () => {
    setShowStartTime(false);
    setShowEndTime(false);
    setStartAndEndDate([null, null]);
    handleClose();
  };

  const handleEventName = (event) => {
    setSubmittedError(false);
    setName(event.target.value);
  };
  const getStartDateTime = (date) => {
    setStartAndEndDate([date, startAndEndDate[1]]);
  };

  const getEndDateTime = (date) => {
    setStartAndEndDate([startAndEndDate[0], date]);
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
    if (startAndEndDate[0] && startAndEndDate[1]) {
      const startDate = new Date(startAndEndDate[0]);
      const endDate = new Date(startAndEndDate[1]);

      if (startDate.getTime() < endDate.getTime()) {
        setIsValidDateOrder(true);
      } else {
        setIsValidDateOrder(false);
      }
    }
  };

  React.useEffect(() => {
    checkDateOrder();
    console.log(selectedDate);
    console.log("SKIP");
    console.log(startAndEndDate);
  }, [startAndEndDate]);

  /*
  TODO:
  get the start and end time to fill in,

  on click modal, set both the start and end time state to false

  put the current tim next to start time
  and end time
  
  put the date at the top

  put the please fill event name under the required input
  */

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title={headerText}
            subTitle={
              startAndEndDate[0]
                ? dayjs(new Date(startAndEndDate[0]["$d"])).format("MMMM D")
                : ""
            }
          />
          <h3 className="text-pink-600">
            {startAndEndDate[0]
              ? startAndEndDate[0].format("YYYY-MM-DD")
              : "No date set"}
          </h3>

          <Typography
            sx={{ color: colors.primary[100] }}
            variant="h2"
            component="h2"
          ></Typography>
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
                  >
                    {startAndEndDate[0]
                      ? dayjs(startAndEndDate[0]).format("hh:mm A").toString()
                      : ""}
                  </Typography>
                </Box>
              </Box>

              <Box className={`fade ${showStartTime ? "show" : ""}`}>
                <DigitalClock
                  getDateTime={getStartDateTime}
                  defaultValue={startAndEndDate[0]}
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
                  {startAndEndDate[1]
                    ? dayjs(startAndEndDate[1]).format("hh:mm A").toString()
                    : ""}
                </Typography>
              </Box>

              <Box className={`py-3 fade ${showEndTime ? "show" : ""}`}>
                <DigitalClock
                  getDateTime={getEndDateTime}
                  defaultValue={startAndEndDate[1]}
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
