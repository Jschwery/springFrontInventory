import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { Box } from "@mui/material";

export default function DigitalClock() {
  const handleDigitalChange = (event: any) => {
    console.log("cool");
    console.log(typeof event);
    console.log(event);

    const locale = event.$L;
    const date = event.$d;

    console.log("Locale: ", locale);
    console.log("Date and time: ", date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        p={"10px"}
        sx={{
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: "red",
          },
        }}
      >
        <MultiSectionDigitalClock onChange={handleDigitalChange} />
      </Box>
    </LocalizationProvider>
  );
}
