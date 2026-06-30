import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbarStore } from "../../store/snackbarStore";

export default function SnackbarRoot() {
  const { open, message, severity, hide } = useSnackbarStore((s) => ({
    open: s.open,
    message: s.message,
    severity: s.severity,
    hide: s.hide,
  }));

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={hide} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={hide} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
