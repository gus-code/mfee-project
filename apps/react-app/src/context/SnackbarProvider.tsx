// ACT 7 
import { Alert, Snackbar} from "@mui/material"
import React, { createContext, useState, useCallback, useContext } from "react";

import { Alert as alertType} from "../types";

interface SnackbarContextProps {
  createAlert: (alert: alertType) => void;
}

interface SnackbarProviderProps {
  children: React.JSX.Element;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  createAlert: ()=> {}
});

export function SnackbarProvider({
  children,
}: SnackbarProviderProps): React.JSX.Element {
  const [openSB, setOpenSB] = useState(false);
  const [alert, setAlert] = useState<alertType>({message: "", severity: "success"});

    const createAlert = useCallback((newAlert: alertType) => {
        setAlert(newAlert);
        setOpenSB(true);
    }, []);

    const closeAlert = () =>{
        setOpenSB(false);
    };

  return (
    <SnackbarContext.Provider
      value={{
        createAlert
      }}>
      {children}
      <Snackbar open={openSB} autoHideDuration={3000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={alert.severity}>
            {alert.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
