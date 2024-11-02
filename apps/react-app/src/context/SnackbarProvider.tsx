// ACT 7 - Create SnackbarProvider

import { createContext, useState, useContext } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

interface SnackbarProviderProps {
    children: React.ReactNode;
}

interface SnackbarContextProps {
    createAlert: (severity: Severity, message: string) => void;

}

interface SnackbarState {
    open: boolean,
    severity: Severity,
    message: string
}

type Severity = "success" | "info" | "warning" | "error";

export const SnackbarContext = createContext<SnackbarContextProps>({
   createAlert: () => {}
});

export function SnackbarProvider({
    children
}: SnackbarProviderProps): React.JSX.Element {
    const initialSnackbarState: SnackbarState = {
        open: false,
        severity: "success",
        message: ""
    }
    const [snackbar, setSnackbar] = useState<SnackbarState>(initialSnackbarState);

    const createAlert = (severity: Severity, message: string) => {
        setSnackbar({open: true, severity, message});
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if(reason === "clickaway"){
            return;
        }

        setSnackbar({...snackbar, open: false});
    }

    return ( 
        <SnackbarContext.Provider value={{createAlert}}>
            <Snackbar
                open={snackbar.open}
                onClose={handleClose}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {children}
        </SnackbarContext.Provider>
    );
}