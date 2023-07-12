import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../theme";

type DigitalClockProps = {
  getDateTime: (date: any) => void;
  defaultDate?: any;
};

export default function DigitalClock({
  getDateTime,
  defaultDate,
}: DigitalClockProps) {
  const [dateTime, setDateTime] = React.useState(defaultDate);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (dateTime) {
      getDateTime(dateTime);
    }
  }, [dateTime]);

  const handleDigitalChange = (event: any) => {
    setDateTime(event);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        p={"10px"}
        sx={{
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: colors.greenAcc[500],
          },
        }}
      >
        <MultiSectionDigitalClock
          onChange={handleDigitalChange}
          defaultValue={dateTime}
        />
      </Box>
    </LocalizationProvider>
  );
}
