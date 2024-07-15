import { Snackbar } from "@mui/material";
import React from "react";

const Alert = ({ vertical, horizontal, message, open, handleClose }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </>
  );
};

export default Alert;
