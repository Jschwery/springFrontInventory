import { Box, Typography, useTheme, Button, Modal } from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import { useEffect } from "react";
import Header from "../../components/Header";

export default function DeleteModal({
  open,
  handleClose,
  selectedEvent,
  deleteEventCallback,
}) {
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

  const handleDelete = () => {
    deleteEventCallback(selectedEvent);
    handleClose();
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
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: colors.primary[100],
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            {selectedEvent && `Selected event: ${selectedEvent.title}`}
          </Typography>
          <Typography
            variant="h4"
            component="h4"
            sx={{ color: colors.primary[100], py: "10px" }}
          >
            Are you sure you want to delete this event?
          </Typography>

          <Box m="20px">
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                onClick={handleDelete}
                style={{
                  backgroundColor: `${colors.greenAcc[600]}`,
                  color: `${colors.grey[100]}`,
                }}
                variant="contained"
              >
                Delete Event
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
