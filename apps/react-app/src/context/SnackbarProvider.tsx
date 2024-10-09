import React, { createContext, SyntheticEvent, useState, useCallback } from 'react';
import AlertComponent from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import { Alert } from '../types';

type Severity = 'error' | 'warning' | 'info' | 'success' | undefined;
type CreateAlert = (message: string, severity?: Severity) => void;

interface SnackbarContextProps {
  createAlert: CreateAlert;
}

interface SnackbarProviderProps {
  children: React.JSX.Element;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  createAlert: () => {}
});

export function SnackbarProvider({ children }: SnackbarProviderProps): React.JSX.Element {
  const [alert, setAlert] = useState<Alert | null>();
  const [open, setOpen] = useState(false);

  const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const createAlert = useCallback((message: string, severity?: Severity) => {
    setAlert({
      severity,
      message
    });
    setOpen(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ createAlert }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <AlertComponent onClose={handleClose} severity={alert?.severity} variant="filled" sx={{ width: '100%' }}>
          {alert?.message}
        </AlertComponent>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
