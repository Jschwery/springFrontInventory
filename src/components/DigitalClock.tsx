import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { tokens } from "../theme";

type DigitalClockProps = {
  getDateTime: (date: any) => void;
};

export default function DigitalClock({ getDateTime }: DigitalClockProps) {
  const [dateTime, setDateTime] = React.useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    if (dateTime !== "") {
      getDateTime(dateTime);
    }
  }, [dateTime]);

  const handleDigitalChange = (event: any) => {
    const locale = event.$L;
    const date = event.$d;
    setDateTime(date);
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
        <MultiSectionDigitalClock onChange={handleDigitalChange} />
      </Box>
    </LocalizationProvider>
  );
}
