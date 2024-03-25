import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, useState } from 'react';

interface SnackbarContextProps {
  createAlert: (severity: AlertColor, message: string) => void;
}

interface SnackbarProviderProps {
  children: React.JSX.Element;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  createAlert: () => {}
});

export function SnackbarProvider({ children }: SnackbarProviderProps): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createAlert = (severity: AlertColor, message: string) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={5000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={{ createAlert }}>{children}</SnackbarContext.Provider>
    </>
  );
}
