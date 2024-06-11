//✅ ACT 7 - Create SnackbarProvider
import { createContext, useCallback, useState } from "react";
import { Alert } from "../types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

interface Props {
  children: React.JSX.Element;
}

export const AlertContext = createContext({
  createAlert: (alert: Alert) => {}
})

export function SnackbarProvider({
  children
}: Props): React.JSX.Element {

  const [alert, setAlert ] = useState<Alert>( { severity: 'success', message: '' } )
  const [showAlert, setShowAlert ] = useState<boolean>( false )

  const createAlert = useCallback(
    (alert: Alert) => {
      setAlert(alert)
      setShowAlert(true)
    }, []
  )

  const handleClose = () => {
    setShowAlert(false)
  }

  return (
    <AlertContext.Provider
      value={{
        createAlert
      }}
    >
      {(
        <Dialog onClose={ handleClose } open={ showAlert }>
          <DialogTitle> Item Deleted </DialogTitle>
          <DialogContent>
            <DialogContentText>
              { alert.message }
            </DialogContentText>
            <DialogActions>
              <Button onClick={ handleClose }>
                Agree
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
      { children }
    </AlertContext.Provider>
  )
}

