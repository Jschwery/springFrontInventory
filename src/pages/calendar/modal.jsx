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
  allDayEvent,
}) {
  const [eventName, setName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    position: "absolute",
    top: "40%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: `${colors.primary[500]}`,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  React.useEffect(() => {
    setStartDate(format(addDays(new Date(selectedDate[0]), 1), "yyyy-MM-dd"));
    setEndDate(format(addDays(new Date(selectedDate[1]), 1), "yyyy-MM-dd"));
  }, [selectedDate]);

  const checkoutSchema = yup.object().shape({
    date: yup
      .date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
  });

  let initialValues = {
    startDate: selectedDate[0]
      ? format(addDays(new Date(selectedDate[0]), 1), "yyyy-MM-dd")
      : "",
    endDate: selectedDate[1]
      ? format(addDays(new Date(selectedDate[1]), 1), "yyyy-MM-dd")
      : "",
  };

  const formInitialValues = initialValues.endDate
    ? initialValues
    : { date: initialValues.startDate };

  const handleFormSubmit = (values, start, end) => {
    functionCallback(
      eventName,
      start,
      format(addDays(new Date(end), 2), "yyyy-MM-dd"),
      true
    );
    handleClose();
  };

  format(addDays(new Date(), 1), "yyyy-MM-dd");

  const handleEventName = (event) => {
    setName(event.target.value);
  };

  return (
    <Box
      sx={{
        "& .MuiModal-root .MuiBox-root": {
          borderRadius: "12px",
        },
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            {headerText}
          </Typography>
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
                          color: `${colors.greenAcc[500]}`,
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: `${colors.greenAcc[500]}`,
                          },
                          "&:hover fieldset": {
                            borderColor: `${colors.greenAcc[500]}`,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: `${colors.greenAcc[500]}`,
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: `${colors.greenAcc[500]}`,
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
                        color="secondary"
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
