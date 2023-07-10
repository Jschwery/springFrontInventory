import { TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import "./calStyles.css";
import { Box, Typography, useTheme, Button, Modal } from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import { addDays } from "date-fns";
import { useState } from "react";
import DigitalClock from "../../components/DigitalClock";

export default function WeekDayModal({
  open,
  handleClose,
  headerText,
  functionCallback,
  selectedDate,
}) {
  React.useEffect(() => {
    console.log("selected date is: ");
    console.log(selectedDate);
  }, [selectedDate]);

  const [eventName, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [submittedError, setSubmittedError] = useState("");

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
    if (selectedDate.startStr) {
      let stringNew = format(
        new Date(selectedDate.startStr),
        "yyyy-MM-dd'T'HH:mm:ss"
      );
      console.log(stringNew);
      setStartDate(stringNew);
    }
  }, [selectedDate]);

  const checkoutSchema = yup.object().shape({
    date: yup
      .date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
  });

  const formInitialValues = {
    date: addDays(new Date(), 1).toISOString().substring(0, 10),
  };

  const handleFormSubmit = (values) => {
    if (eventName !== "") {
      functionCallback(
        eventName,
        `${values.startDate}T${values.startTime}`,
        `${values.endDate}T${values.endTime}`,
        false
      );
      setName("");
      handleClose();
    } else {
      setSubmittedError(true);
    }
  };

  const handleEventName = (event) => {
    setSubmittedError(false);
    setName(event.target.value);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: colors.primary[100] }}
            variant="h2"
            component="h2"
          >
            yo
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
              <DigitalClock />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pt: "20px",
              }}
            >
              <Button
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
