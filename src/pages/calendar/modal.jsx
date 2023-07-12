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

export default function BasicModal({
  open,
  handleClose,
  headerText,
  functionCallback,
  selectedDate,
}) {
  const [eventName, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
    if (selectedDate.startStr && selectedDate.endStr) {
      setStartDate(
        format(addDays(new Date(selectedDate.startStr), 1), "yyyy-MM-dd")
      );
      setEndDate(
        format(addDays(new Date(selectedDate.endStr), 0), "yyyy-MM-dd")
      );
    }
  }, [selectedDate]);

  let initialValues = {
    startDate: selectedDate.startStr
      ? format(addDays(new Date(selectedDate.startStr), 1), "yyyy-MM-dd")
      : "",
    endDate: selectedDate.endStr
      ? format(addDays(new Date(selectedDate.endStr), 0), "yyyy-MM-dd")
      : "",
  };

  const formInitialValues = initialValues.endDate
    ? initialValues
    : { date: initialValues.startDate };

  const checkoutSchema = yup.object().shape({
    date: yup
      .date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
  });

  const handleFormSubmit = (values, start, end) => {
    if (eventName !== "") {
      functionCallback(
        eventName,
        start,
        format(addDays(new Date(end), 2), "yyyy-MM-dd"),
        true
      );
      setName("");
      handleClose();
    } else {
      setSubmittedError(true);
    }
  };

  format(addDays(new Date(), 1), "yyyy-MM-dd");

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
            {headerText}
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </span>
            </Typography>
          )}
          <Box m="20px">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={formInitialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => {
                const handleStartDateChange = (event) => {
                  handleChange(event);
                  setStartDate(event.target.value);
                };

                const handleEndDateChange = (event) => {
                  handleChange(event);
                  setEndDate(event.target.value);
                };

                return (
                  <form onSubmit={handleSubmit}>
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
                    </Box>
                    <Box sx={{ mb: "10px" }}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="date"
                        label="Start Date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onBlur={handleBlur}
                        onChange={handleStartDateChange}
                        value={values.startDate || values.date}
                        name={values.endDate ? "startDate" : "date"}
                        error={
                          (touched.startDate && errors.startDate) ||
                          (touched.date && errors.date)
                        }
                        helperText={
                          (touched.startDate && errors.startDate) ||
                          (touched.date && errors.date)
                        }
                      />
                    </Box>
                    {values.endDate && (
                      <Box>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="date"
                          label="End Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onBlur={handleBlur}
                          onChange={handleEndDateChange}
                          value={values.endDate}
                          name="endDate"
                          error={touched.endDate && errors.endDate}
                          helperText={touched.endDate && errors.endDate}
                        />
                      </Box>
                    )}

                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button
                        onClick={() =>
                          handleFormSubmit(eventName, startDate, endDate)
                        }
                        style={{
                          backgroundColor: `${colors.greenAcc[600]}`,
                          color: `${colors.grey[100]}`,
                        }}
                        variant="contained"
                      >
                        Create Event
                      </Button>
                    </Box>
                  </form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
