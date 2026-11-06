import React, {createContext, useCallback, useState} from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';

interface SnackbarContextProps {
	createAlert:(message:string, severity:AlertColor) => void;
}

interface SnackbarProviderProps {
	children: React.JSX.Element;
};


export const SnackbarContext = createContext<SnackbarContextProps>({
	createAlert: () => {}
});

export function SnackbarProvider({
	children,
}: SnackbarProviderProps): React.JSX.Element {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();

	const createAlert = useCallback((msg: string, sevy:AlertColor) => {
		setMessage(msg);
    setSeverity(sevy);
		setOpen(true);
	}, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event | null,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{createAlert}}>
			{children}
			<Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
		</SnackbarContext.Provider>
      
  );
}
