import { Grid } from "@mui/material";
import { borderRadius, fontSize, styled } from "@mui/system";

export const PageContainer = styled(Grid)`
  gap: 16px;
  display: flex;
  padding: 32px;
  flex-wrap: nowrap;
  flex-direction: column;
  flex-grow: 1;
`; 



export const ModalBackground = styled("div")({ 
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  
});

export const ModalContent = styled("div")({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "500px",

  "& input": {
    width: "95%",
    marginTop: "0px",
    marginBottom: "12px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
});

export const ModalActions = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "8px",

  "& button":{
    width: "80px",
    height: "25px",
    fontSize: "14px",
    border: "none",
    color: "white",
    backgroundColor: "#1976d2",
    borderRadius: "8px" 

  }

});
