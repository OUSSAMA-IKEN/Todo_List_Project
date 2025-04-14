import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbars({ open, messageProp: message }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
