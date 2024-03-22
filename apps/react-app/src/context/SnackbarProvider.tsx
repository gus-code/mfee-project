import { Alert, Snackbar } from '@mui/material';
import { createContext, useState } from 'react';

interface SnackbarContextProps {
  createAlert: (severity: 'success' | 'error', message: string) => void;
}

interface PostProviderProps {
  children: React.JSX.Element;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  createAlert: () => {}
});

export function SnackbarProvider({ children }: PostProviderProps): React.JSX.Element {
  const [open, setOpen] = useState(true);

  function createAlert (severity: 'success' | 'error', message: string) {
    setOpen(true);
    console.log(message);

    return (
      <Snackbar open={open} autoHideDuration={5000}>
        <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  };

  return <SnackbarContext.Provider value={{ createAlert }}>{children}</SnackbarContext.Provider>;
}
